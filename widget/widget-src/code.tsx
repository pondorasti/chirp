import {
  activeHeartIcon,
  activeReplyIcon,
  activeRetweetIcon,
  externalLinkIcon,
  heartIcon,
  impressionsIcon,
  TWITTER_FADED_RED,
  TWITTER_RED,
  refreshIcon,
  TWITTER_FADED_BLUE,
  TWITTER_BLUE,
  replyIcon,
  TWITTER_FADED_GREEN,
  TWITTER_GREEN,
  retweetIcon,
  slidersIcon,
  TWITTER_GRAY_SECONDARY,
  twitterIcon,
  activeImpressionsIcon,
} from "./icons"
import { IntentGroup, UNDERLAY_OFFSET } from "./intent-group"
import { MediaGroup } from "./media-group"
import { Form } from "./form"
import { fetchTweet, openURL, Tweet } from "./lib"

const { widget } = figma
const { usePropertyMenu, useSyncedState, AutoLayout, Text, Image, SVG } = widget

const CARD_PADDING = 32

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
      padding={{
        top: CARD_PADDING,
        right: CARD_PADDING,
        // offset negative padding creating by `<IntentGroup>`
        bottom: tweet ? CARD_PADDING - UNDERLAY_OFFSET : CARD_PADDING,
        left: CARD_PADDING,
      }}
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
                fill={TWITTER_GRAY_SECONDARY}
                onClick={() => openURL(`https://twitter.com/${tweet.author.username}`)}
              >
                @{tweet.author.username}
              </Text>
            </AutoLayout>
            <SVG src={twitterIcon} width={24} height={24} />
          </AutoLayout>

          <Text
            fontSize={16}
            lineHeight={24}
            fontWeight={400}
            width="fill-parent"
            fontFamily="Inter"
          >
            {tweet.text}
          </Text>

          <MediaGroup media={tweet.media} />

          <AutoLayout
            name="metrics-container"
            width="fill-parent"
            spacing="auto"
            direction="horizontal"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            overflow="visible"
          >
            <IntentGroup
              isFirst
              name="reply-intent"
              count={tweet.publicMetrics.replyCount}
              foregroundFill={TWITTER_BLUE}
              backgroundFill={TWITTER_FADED_BLUE}
              icon={replyIcon}
              activeIcon={activeReplyIcon}
              onClick={() => openURL(`https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`)}
            />

            <IntentGroup
              name="retweet-intent"
              count={tweet.publicMetrics.retweetCount}
              foregroundFill={TWITTER_GREEN}
              backgroundFill={TWITTER_FADED_GREEN}
              icon={retweetIcon}
              activeIcon={activeRetweetIcon}
              onClick={() => openURL(`https://twitter.com/intent/retweet?tweet_id=${tweet.id}`)}
            />

            <IntentGroup
              name="like-intent"
              count={tweet.publicMetrics.likeCount}
              foregroundFill={TWITTER_RED}
              backgroundFill={TWITTER_FADED_RED}
              icon={heartIcon}
              activeIcon={activeHeartIcon}
              onClick={() => openURL(`https://twitter.com/intent/like?tweet_id=${tweet.id}`)}
            />

            <IntentGroup
              name="impressions-intent"
              count={tweet.publicMetrics.likeCount}
              foregroundFill={TWITTER_BLUE}
              backgroundFill={TWITTER_FADED_BLUE}
              icon={impressionsIcon}
              activeIcon={activeImpressionsIcon}
              onClick={() =>
                openURL(`https://twitter.com/${tweet?.author.username}/status/${tweet?.id}`)
              }
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
