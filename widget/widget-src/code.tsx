import {
  activeHeartIcon,
  activeReplyIcon,
  activeRetweetIcon,
  externalLinkIcon,
  heartIcon,
  likeBackgroundAccent,
  likeForegroundAccent,
  refreshIcon,
  replyBackgroundAccent,
  replyForegroundAccent,
  replyIcon,
  retweetBackgroundAccent,
  retweetForegroundAccent,
  retweetIcon,
  slidersIcon,
  textSecondary,
  twitterBlue,
} from "./Icons"
import IntentGroup from "./IntentGroup"
import MediaGroup from "./MediaGroup"

const { widget } = figma
const { usePropertyMenu, useSyncedState, AutoLayout, Input, Text, Image } = widget

export interface Tweet {
  id: string
  text: string
  publicMetrics: {
    retweetCount: number
    likeCount: number
    replyCount: number
  }
  author: {
    name: string
    username: string
    verified: boolean
    profileImageURI?: string
  }
  media: {
    height: number
    width: number
    altText?: string
    type: "photo" | "video"
    uri: string
  }[]
}

function openURL(url: string): Promise<void> {
  return new Promise((resolve) => {
    figma.showUI(__html__, { visible: false })
    figma.ui.postMessage({ type: "open-url", url })
    figma.ui.onmessage = () => {
      resolve(void 0)
    }
  })
}

function Widget() {
  const [tweetInput, setTweetInput] = useSyncedState("tweetInput", "")
  const [tweet, setTweet] = useSyncedState<Tweet | null>("tweet", null)

  usePropertyMenu(
    tweet
      ? [
          {
            tooltip: "Open Tweet",
            propertyName: "open",
            itemType: "action",
            icon: externalLinkIcon,
          },
          {
            tooltip: "Refresh Tweet",
            propertyName: "refresh",
            itemType: "action",
            icon: refreshIcon,
          },
          {
            tooltip: "Edit Tweet",
            propertyName: "edit",
            itemType: "action",
            icon: slidersIcon,
          },
        ]
      : [],
    async (e) => {
      switch (e.propertyName) {
        case "open":
          await openURL(`https://twitter.com/${tweet?.author.username}/status/${tweet?.id}`)
          break
        case "refresh":
          break
        case "edit":
          setTweet(null)
          break
        default:
          break
      }
    }
  )

  return (
    <AutoLayout
      name="body"
      padding={32}
      spacing={tweet ? 20 : 32}
      cornerRadius={32}
      width={384}
      direction="vertical"
      horizontalAlignItems="start"
      verticalAlignItems="center"
      fill="#ffffff"
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.15 },
        offset: { x: 0, y: 4 },
        blur: 12,
      }}
    >
      {tweet ? (
        <>
          <AutoLayout
            name="author-container"
            spacing={12}
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            width="fill-parent"
          >
            {tweet.author.profileImageURI && (
              <Image src={tweet.author.profileImageURI} width={48} height={48} cornerRadius={48} />
            )}
            <AutoLayout
              name="author-container"
              spacing={2}
              direction="vertical"
              horizontalAlignItems="start"
              verticalAlignItems="center"
              width="fill-parent"
            >
              <Text fontSize={16} fontWeight={600} width="fill-parent" fontFamily="Inter">
                {tweet.author.name}
              </Text>
              <Text
                fontSize={16}
                fontWeight={400}
                width="fill-parent"
                fontFamily="Inter"
                fill={textSecondary}
              >
                @{tweet.author.username}
              </Text>
            </AutoLayout>
          </AutoLayout>

          <Text fontSize={18} fontWeight={400} width="fill-parent" fontFamily="Inter">
            {tweet.text}
          </Text>

          <MediaGroup media={tweet.media} />

          <AutoLayout
            name="metrics-container"
            spacing={8}
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            overflow="visible"
          >
            <IntentGroup
              isFirst
              name="reply-intent"
              count={tweet.publicMetrics.replyCount}
              foregroundFill={replyForegroundAccent}
              backgroundFill={replyBackgroundAccent}
              icon={replyIcon}
              activeIcon={activeReplyIcon}
              onClick={() => openURL(`https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`)}
            />

            <IntentGroup
              name="retweet-intent"
              count={tweet.publicMetrics.retweetCount}
              foregroundFill={retweetForegroundAccent}
              backgroundFill={retweetBackgroundAccent}
              icon={retweetIcon}
              activeIcon={activeRetweetIcon}
              onClick={() => openURL(`https://twitter.com/intent/retweet?tweet_id=${tweet.id}`)}
            />

            <IntentGroup
              name="like-intent"
              count={tweet.publicMetrics.likeCount}
              foregroundFill={likeForegroundAccent}
              backgroundFill={likeBackgroundAccent}
              icon={heartIcon}
              activeIcon={activeHeartIcon}
              onClick={() => openURL(`https://twitter.com/intent/like?tweet_id=${tweet.id}`)}
            />
          </AutoLayout>
        </>
      ) : (
        <>
          <Text fontSize={24} fontWeight={600}>
            Chirp
          </Text>

          <AutoLayout
            name="input-container"
            spacing={8}
            direction="vertical"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            width="fill-parent"
          >
            <Text fontSize={16} fontWeight={500}>
              Tweet URL/ID
            </Text>
            <Input
              value={tweetInput}
              placeholder="1585396100026208257"
              onTextEditEnd={(e) => {
                setTweetInput(e.characters)
              }}
              fontSize={16}
              fill="#525252"
              inputFrameProps={{
                fill: "#f5f5f5",
                cornerRadius: 12,
                padding: 8,
              }}
              inputBehavior="wrap"
              width="fill-parent"
            />
          </AutoLayout>
          <AutoLayout
            name="create-tweet"
            padding={12}
            cornerRadius={16}
            direction="vertical"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            width="fill-parent"
            fill={twitterBlue}
            onClick={() =>
              new Promise((resolve) => {
                figma.showUI(__html__, { visible: false })

                // get id after the last slash and trim everything after question mark
                // ex: https://twitter.com/lavieestbelIe/status/1589649527195115520?s=20&t=IMsQCAsl6pkN0QO9EcTKLA → 1589649527195115520
                // ex: https://twitter.com/lavieestbelIe/status/1589649527195115520 → 1589649527195115520
                const potentialId = tweetInput.split("/").pop()?.split("?").shift()

                if (tweetInput.includes("https://twitter.com") && potentialId) {
                  figma.ui.postMessage({ type: "fetch-tweet", id: potentialId })
                } else if (tweetInput.match(/^\d+$/)) {
                  figma.ui.postMessage({ type: "fetch-tweet", id: tweetInput })
                } else {
                  figma.notify("⚠️ Invalid tweet input")
                  resolve(null)
                }

                figma.ui.onmessage = (tweet) => {
                  setTweet(tweet)
                  resolve(null)
                }
              })
            }
          >
            <Text fill="#fff" fontWeight={600} fontSize={18}>
              Embed
            </Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  )
}

widget.register(Widget)
