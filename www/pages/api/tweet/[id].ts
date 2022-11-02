import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import { z } from "zod"
import twitter from "../../../lib/twitter"

const schema = z.object({
  id: z.string().min(1),
})

type IResponse =
  | {
      text: string
      createdAt?: string
      publicMetrics: {
        retweetCount: number
        likeCount: number
        replyCount: number
      }
    }
  | {
      error: string
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
  })

  const body = schema.safeParse(req.query)

  if (!body.success) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const response = await twitter.tweets.findTweetsById({
    ids: [body.data.id],
    "tweet.fields": [
      "attachments",
      "author_id",
      "context_annotations",
      "conversation_id",
      "created_at",
      "entities",
      "geo",
      "id",
      "in_reply_to_user_id",
      "possibly_sensitive",
      "referenced_tweets",
      "reply_settings",
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
    "user.fields": ["profile_image_url", "url", "username"],
  })

  const tweet = response.data?.[0]

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" })
  }

  const formattedText = tweet?.text.replace(/https:\/\/[\n\S]+/g, "").replace("&amp;", "&")
  res.status(200).json({
    text: formattedText,
    createdAt: tweet.created_at,
    publicMetrics: {
      retweetCount:
        (tweet.public_metrics?.retweet_count ?? 0) + (tweet.public_metrics?.quote_count ?? 0),
      likeCount: tweet.public_metrics?.like_count ?? 0,
      replyCount: tweet.public_metrics?.reply_count ?? 0,
    },
    // tweet: response.data,
  })
}
