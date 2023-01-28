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
  twitterIcon,
} from "./icons"
import IntentGroup from "./IntentGroup"
import MediaGroup from "./MediaGroup"
import Form from "./Form"
import { fetchTweet, openURL, Tweet } from "./lib"

const { widget } = figma
const { usePropertyMenu, useSyncedState, AutoLayout, Text, Image, SVG } = widget

function Widget() {
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
          if (!tweet) break

          const newTweet = await fetchTweet(tweet.id)
          setTweet(newTweet)
          figma.notify("✓ Tweet refreshed")
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
              <Image
                src={tweet.author.profileImageURI}
                width={48}
                height={48}
                cornerRadius={48}
                onClick={() => openURL(`https://twitter.com/${tweet.author.username}`)}
              />
            )}
            <AutoLayout
              name="author-container"
              spacing={2}
              direction="vertical"
              horizontalAlignItems="start"
              verticalAlignItems="center"
              width="fill-parent"
            >
              <Text
                fontSize={16}
                fontWeight={600}
                width="fill-parent"
                fontFamily="Inter"
                opacity={1}
                hoverStyle={{ opacity: 0 }}
                onClick={() => openURL(`https://twitter.com/${tweet.author.username}`)}
              >
                {tweet.author.name}
              </Text>
              <Text
                positioning="absolute"
                fontSize={16}
                fontWeight={600}
                width="fill-parent"
                fontFamily="Inter"
                opacity={0}
                hoverStyle={{ opacity: 1 }}
                textDecoration="underline"
                onClick={() => openURL(`https://twitter.com/${tweet.author.username}`)}
              >
                {tweet.author.name}
              </Text>
              <Text
                fontSize={16}
                fontWeight={400}
                width="fill-parent"
                fontFamily="Inter"
                fill={textSecondary}
                onClick={() => openURL(`https://twitter.com/${tweet.author.username}`)}
              >
                @{tweet.author.username}
              </Text>
            </AutoLayout>
            <SVG src={twitterIcon} width={24} height={24} />
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
        <Form />
      )}
    </AutoLayout>
  )
}

widget.register(Widget)
