import { ITweet } from "../pages/api/tweet/[id]"
import {
  FigmaIcon,
  HeartIcon,
  ImpressionIcon,
  ReplyIcon,
  RetweetIcon,
  TwitterIcon,
} from "./components/icons"
import { TiltWrapper } from "./components/tilt"
import Image from "next/image"
import clsx from "clsx"

const tweetIds = [
  "1334334544598740994",
  "826528907381739520",
  "1504190572336087040",
  "1189444653059174401",
  "1588943426229522433",
  "1312386219599433729",
  "1582805523484680192",
  "1617678030964682753",
]

async function getTweets(): Promise<ITweet[]> {
  const shuffledTweets = tweetIds.sort(() => 0.5 - Math.random())
  const ids = shuffledTweets.slice(0, 3)
  const tweets = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch("https://chirp.alexandru.so/api/tweet/" + id, {
        next: { revalidate: 60 },
      })
      const data = await res.json()
      return data
    })
  )

  return tweets
}

const IntentGroup = ({
  icon,
  count,
  label,
  href,
  foregroundColor,
  backgroundColor,
}: {
  icon: React.ReactNode
  count: number
  label: string
  href: string
  foregroundColor: string
  backgroundColor: string
}) => (
  <a
    className={clsx(
      "flex flex-row gap-1 items-center cursor-pointer group/intent text-twitter-gray fill-twitter-gray",
      foregroundColor
    )}
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    <div aria-hidden className={clsx("p-[7px] rounded-full", backgroundColor)}>
      {icon}
    </div>
    <span className="leading-none text-[13px]">
      {count > 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString()}
    </span>
    <span className="sr-only">{label}</span>
  </a>
)

const TRANSFORM_ANIMATION =
  "transition-transform duration-[600ms] [transition-timing-function:ease] will-change-transform"
const PARALLAX_STYLE = "group-hover:[transform:translateZ(30px)]"

export default async function Home() {
  const tweets = await getTweets()
  const tweet = tweets[0]

  return (
    <div className="flex flex-col items-center min-h-screen pt-32 pb-10 px-6">
      <main className="contents">
        <h1 className="text-4xl font-semibold mb-4 text-center">Twitter Widget for Figma/FigJam</h1>
        <p className="text-2xl text-gray-600 font-medium text-center mb-16">
          Embed any tweets in figma
        </p>

        <div
          className={clsx(
            "hover:scale-[1.02] transition-transform duration-[600ms] [transition-timing-function:ease]",
            TRANSFORM_ANIMATION
          )}
        >
          <TiltWrapper className="[transform-style:preserve-3d] group bg-white p-8 flex flex-col gap-5 rounded-[32px] shadow-lg hover:shadow-xl font-inter max-w-md">
            <div className={clsx("flex gap-3 items-center", PARALLAX_STYLE, TRANSFORM_ANIMATION)}>
              {tweet.author.profileImageURI && (
                <a
                  href={`https://twitter.com/${tweet.author.username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={tweet.author.profileImageURI}
                    alt={`${tweet.author.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="rounded-full"
                    priority
                  />
                </a>
              )}
              <div className="flex flex-col">
                <a
                  href={`https://twitter.com/${tweet.author.username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3 className="text-md font-medium leading-5 underline-offset-2 hover:underline">
                    {tweet.author.name}
                  </h3>
                </a>
                <a
                  href={`https://twitter.com/${tweet.author.username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4 className="text-twitter-gray pt-0.5 leading-5">@{tweet.author.username}</h4>
                </a>
              </div>

              <a
                className="text-twitter-brand-blue ml-auto"
                href={`https://twitter.com/${tweet?.author.username}/status/${tweet?.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon />
              </a>
            </div>

            <p className={clsx("text-lg", PARALLAX_STYLE, TRANSFORM_ANIMATION)}>{tweet.text}</p>

            <div
              className={clsx(
                "flex justify-between items-center w-full -m-[7px]",
                PARALLAX_STYLE,
                TRANSFORM_ANIMATION
              )}
            >
              <IntentGroup
                icon={<ReplyIcon />}
                count={tweet.publicMetrics.replyCount}
                label="replies"
                foregroundColor="hover:text-twitter-blue"
                backgroundColor="group-hover/intent:bg-twitter-faded-blue"
                href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`}
              />
              <IntentGroup
                icon={<HeartIcon />}
                count={tweet.publicMetrics.likeCount}
                label="likes"
                foregroundColor="hover:text-twitter-red"
                backgroundColor="group-hover/intent:bg-twitter-faded-red"
                href={`https://twitter.com/intent/like?tweet_id=${tweet.id}`}
              />
              <IntentGroup
                icon={<RetweetIcon />}
                count={tweet.publicMetrics.retweetCount}
                label="retweets"
                foregroundColor="hover:text-twitter-green"
                backgroundColor="group-hover/intent:bg-twitter-faded-green"
                href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id}`}
              />
              {tweet.publicMetrics.impressionCount > 0 && (
                <IntentGroup
                  icon={<ImpressionIcon />}
                  count={tweet.publicMetrics.impressionCount}
                  label="impressions"
                  foregroundColor="hover:text-twitter-blue"
                  backgroundColor="group-hover/intent:bg-twitter-faded-blue"
                  href={`https://twitter.com/${tweet?.author.username}/status/${tweet?.id}`}
                />
              )}
            </div>
          </TiltWrapper>
        </div>

        <a
          className="flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer mt-16 mb-20"
          href="https://www.figma.com/community/widget/1167909952592149014"
          target="_blank"
          rel="noreferrer"
        >
          <FigmaIcon />
          Install for free
        </a>
      </main>

      <footer className="flex flex-grow mt-20 mb-10">
        <div className="mt-auto font-medium text-gray-500">
          Crafted with care by <span className="font-semibold text-gray-600">Alexandru</span>
        </div>
      </footer>
    </div>
  )
}
