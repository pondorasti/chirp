import { ITweet } from "../pages/api/tweet/[id]"
import { FigmaIcon, HeartIcon, ImpressionsIcon, ReplyIcon, RetweetIcon } from "./components/icons"
import Image from "next/image"

const tweetIds = [
  "1334334544598740994",
  "826528907381739520",
  "1504190572336087040",
  "1189444653059174401",
  "1588943426229522433",
  "1312386219599433729",
  "1582805523484680192",
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
  href,
}: {
  icon: React.ReactNode
  count: number
  href: string
}) => {
  return (
    <a
      className="flex flex-row gap-1 items-center cursor-pointer hover:text-twitter-red group text-twitter-gray fill-twitter-gray"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="group-hover:bg-twitter-faded-red p-[7px] rounded-full">{icon}</div>
      <span className="leading-none text-[13px]">
        {count > 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString()}
      </span>
    </a>
  )
}

export default async function Home() {
  const tweets = await getTweets()
  const tweet = tweets[0]

  console.log({ tweets })

  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-10">
      <main>
        <h1 className="text-4xl font-semibold mb-4">Twitter Widget for Figma/FigJam</h1>
        <p className="text-2xl text-gray-600 font-medium text-center mb-8">
          Embed any tweets in figma
        </p>

        <div className="bg-white p-8 flex flex-col gap-5 rounded-[32px] shadow-lg font-inter max-w-md mx-auto">
          <div className="flex gap-3 items-center">
            {tweet.author.profileImageURI && (
              <Image
                src={tweet.author.profileImageURI}
                alt={`${tweet.author.name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-md font-medium leading-5">{tweets[0].author.name}</h3>
              <h4 className="text-twitter-gray pt-0.5 leading-5">@{tweet.author.username}</h4>
            </div>
          </div>

          <p className="text-base">{tweet.text}</p>

          <div className="flex justify-between items-center w-full -m-[7px]">
            <IntentGroup
              icon={<ReplyIcon />}
              count={tweet.publicMetrics.replyCount}
              href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`}
            />
            <IntentGroup
              icon={<HeartIcon />}
              count={tweet.publicMetrics.likeCount}
              href={`https://twitter.com/intent/like?tweet_id=${tweet.id}`}
            />
            <IntentGroup
              icon={<RetweetIcon />}
              count={tweet.publicMetrics.retweetCount}
              href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id}`}
            />
            <IntentGroup
              icon={<ImpressionsIcon />}
              count={tweet.publicMetrics.retweetCount}
              href={`https://twitter.com/${tweet?.author.username}/status/${tweet?.id}`}
            />
          </div>
        </div>

        <a
          className="flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer mb-20"
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
