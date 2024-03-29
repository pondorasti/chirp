import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import { z } from "zod"
import imageToBase64 from "image-to-base64"
import twitter from "../../../lib/twitter"
import { getPlaiceholder } from "plaiceholder"

const schema = z.object({
  id: z.string().min(1),
})

export type ITweet = {
  id: string
  text: string
  createdAt?: string
  publicMetrics: {
    retweetCount: number
    likeCount: number
    replyCount: number
    impressionCount: number
  }
  author: {
    name: string
    username: string
    verified: boolean
    profileImageURI?: string
  }
  media: {
    id: string
    height: number
    width: number
    altText?: string
    type: "photo" | "video"
    uri: string
    preview_image_url?: string // Only for `video` type
    url: string
    blurDataURL: string
  }[]
}

type IResponse = ITweet | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
  })

  const body = schema.safeParse(req.query)

  if (!body.success) return res.status(400).json({ error: "Invalid request" })

  const response = await twitter.tweets.findTweetsById({
    ids: [body.data.id],
    "tweet.fields": [
      "attachments",
      "author_id",
      "created_at",
      "entities",
      "geo",
      "id",
      "referenced_tweets",
      "text",
      "withheld",
      "public_metrics",
    ],
    expansions: [
      "attachments.media_keys",
      "attachments.poll_ids",
      "author_id",
      "entities.mentions.username",
      "referenced_tweets.id",
      "referenced_tweets.id.author_id",
    ],
    "media.fields": [
      "alt_text",
      "duration_ms",
      "height",
      "media_key",
      "preview_image_url",
      "type",
      "url",
      "variants",
      "width",
    ],
    "user.fields": ["id", "profile_image_url", "url", "username", "verified"],
  })

  const tweet = response.data?.[0]
  const users = response.includes?.users
  const author = users?.find((user) => user.id === tweet?.author_id)

  if (!tweet) return res.status(404).json({ error: "Tweet not found" })
  if (!author) return res.status(404).json({ error: "Author not found" })

  // Tweet Content Parsing
  const formattedText = tweet?.text.replace(/https:\/\/[\n\S]+/g, "").replace("&amp;", "&")

  // Profile Image Conversation
  const profileImageURI = author.profile_image_url
    ? // By default the API returns a 48x48 image, but we want to get the retina version, 96x96.
      `data:image/png;base64,${await imageToBase64(author.profile_image_url.replace("_normal", "_x96"))}`
    : undefined

  // Media Conversation
  const media: ITweet["media"] = []
  for await (const mediaKey of tweet.attachments?.media_keys || []) {
    const mediaItem = response.includes?.media?.find((media) => media.media_key === mediaKey)
    if (!mediaItem) continue
    if (!mediaItem.width || !mediaItem.height) continue

    let uri: string
    let sourceUrl: string
    let previewImageUrl: string | undefined
    let blurDataURL: string

    switch (mediaItem.type) {
      case "photo": {
        const url = (mediaItem as any).url as string
        const fileExtension = url.split(".").pop()
        if (!fileExtension) continue

        uri = `data:image/${fileExtension};base64,${await imageToBase64(url)}`
        sourceUrl = url

        const { base64 } = await getPlaiceholder(url, { size: 10 })
        blurDataURL = base64

        break
      }
      case "video": {
        const url = (mediaItem as any).preview_image_url as string
        const fileExtension = url.split(".").pop()
        if (!fileExtension) continue

        const variants = (mediaItem as any).variants as {
          bit_rate?: number
          content_type: string
          url: string
        }[]
        const variant = variants.reduce((prev, curr) => {
          if (!prev.bit_rate) return curr
          if (!curr.bit_rate) return prev
          return prev.bit_rate > curr.bit_rate ? prev : curr
        })

        uri = `data:image/${fileExtension};base64,${await imageToBase64(url)}`
        sourceUrl = variant.url || url
        previewImageUrl = url

        const { base64 } = await getPlaiceholder(previewImageUrl, { size: 10 })
        blurDataURL = base64

        break
      }
      default: {
        continue
      }
    }

    media.push({
      id: mediaKey,
      height: mediaItem.height,
      width: mediaItem.width,
      altText: (mediaItem as any).alt_text,
      type: mediaItem.type,
      uri,
      url: sourceUrl,
      preview_image_url: previewImageUrl,
      blurDataURL,
    })
  }

  res.status(200).json({
    id: tweet.id,
    text: formattedText,
    createdAt: tweet.created_at,
    publicMetrics: {
      retweetCount: (tweet.public_metrics?.retweet_count ?? 0) + (tweet.public_metrics?.quote_count ?? 0),
      likeCount: tweet.public_metrics?.like_count ?? 0,
      replyCount: tweet.public_metrics?.reply_count ?? 0,
      // @ts-ignore - Twitter API is missing this field
      impressionCount: tweet.public_metrics?.impression_count ?? 0,
    },
    author: {
      name: author.name,
      username: author.username,
      verified: !!author.verified,
      profileImageURI,
    },
    media,
    // tweet: response,
  })
}
