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

const { widget } = figma
const { useEffect, usePropertyMenu, useSyncedState, AutoLayout, Input, Text, Image } = widget

interface Tweet {
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
  const [tweetIdInput, setTweetIdInput] = useSyncedState("tweetIdInput", "")
  const [tweet, setTweet] = useSyncedState<Tweet | null>("tweet", null)

  usePropertyMenu(
    [
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
    ],
    async (e) => {
      switch (e.propertyName) {
        case "open":
          await openURL(`https://twitter.com/${tweet?.author.username}/status/${tweetIdInput}`)
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

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "showToast") {
        figma.notify("Hello widget")
      }
      if (msg.type === "close") {
        figma.closePlugin()
      }
    }
  })

  return (
    <AutoLayout
      name="body"
      padding={32}
      spacing={tweet ? 20 : 32}
      cornerRadius={16}
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
            spacing={8}
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
              <Text fontSize={16} fontWeight={600} width="fill-parent" fontFamily="Helvetica Neue">
                {tweet.author.name}
              </Text>
              <Text
                fontSize={16}
                fontWeight={400}
                width="fill-parent"
                fontFamily="Helvetica Neue"
                fill={textSecondary}
              >
                @{tweet.author.username}
              </Text>
            </AutoLayout>
          </AutoLayout>

          <Text fontSize={18} fontWeight={400} width="fill-parent" fontFamily="Helvetica Neue">
            {tweet.text}
          </Text>

          <AutoLayout
            name="metrics-container"
            spacing={8}
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="center"
          >
            <IntentGroup
              name="reply-intent"
              count={tweet.publicMetrics.replyCount}
              foregroundFill={replyForegroundAccent}
              backgroundFill={replyBackgroundAccent}
              icon={replyIcon}
              activeIcon={activeReplyIcon}
              onClick={() =>
                openURL(`https://twitter.com/intent/tweet?in_reply_to=${tweetIdInput}`)
              }
            />

            <IntentGroup
              name="retweet-intent"
              count={tweet.publicMetrics.retweetCount}
              foregroundFill={retweetForegroundAccent}
              backgroundFill={retweetBackgroundAccent}
              icon={retweetIcon}
              activeIcon={activeRetweetIcon}
              onClick={() => openURL(`https://twitter.com/intent/retweet?tweet_id=${tweetIdInput}`)}
            />

            <IntentGroup
              name="like-intent"
              count={tweet.publicMetrics.likeCount}
              foregroundFill={likeForegroundAccent}
              backgroundFill={likeBackgroundAccent}
              icon={heartIcon}
              activeIcon={activeHeartIcon}
              onClick={() => openURL(`https://twitter.com/intent/like?tweet_id=${tweetIdInput}`)}
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
              Tweet ID
            </Text>
            <Input
              value={tweetIdInput}
              placeholder="1585396100026208257"
              onTextEditEnd={(e) => {
                setTweetIdInput(e.characters)
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
                figma.ui.postMessage({ type: "fetch-tweet", id: tweetIdInput })
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

// TODO
// - [x] intents (retweet, like, comment)
// - [ ] annotated text
// - [ ] image cards
// - [ ] gif cards
// - [ ] video cards
