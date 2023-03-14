import clsx from "clsx"
import { ITweet } from "../pages/api/tweet/[id]"
import { FigmaIcon } from "./components/icons"
import { Tweet } from "./components/tweet"

const tweetIds = [
  "1334334544598740994",
  "826528907381739520",
  "1504190572336087040",
  "1189444653059174401",
  "1588943426229522433",
  "1312386219599433729",
  "1582805523484680192",
  "1617678030964682753",
  "1334334544598740994",
  "826528907381739520",
  "1504190572336087040",
  "1189444653059174401",
  "1588943426229522433",
  "1312386219599433729",
]

async function getTweets(): Promise<ITweet[]> {
  const ids = tweetIds
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

const SIDE_OVERLAY_STYLE =
  "pointer-events-none fixed z-10 from-white to-transparent will-change-transform backdrop-blur-[1px]"

export default async function Home() {
  const tweets = await getTweets()

  return (
    <>
      <div aria-hidden className={clsx(SIDE_OVERLAY_STYLE, "-top-1 h-32 w-full bg-gradient-to-b gradient-mask-b-20")} />
      <div
        aria-hidden
        className={clsx(SIDE_OVERLAY_STYLE, "-bottom-1 h-32 w-full bg-gradient-to-t gradient-mask-t-20")}
      />
      <div
        aria-hidden
        className={clsx(SIDE_OVERLAY_STYLE, "-left-1 h-full w-32 bg-gradient-to-r gradient-mask-r-20")}
      />
      <div
        aria-hidden
        className={clsx(SIDE_OVERLAY_STYLE, "-right-1 h-full w-32 bg-gradient-to-l gradient-mask-l-20")}
      />

      <div
        className="grid fixed grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 5xl:grid-cols-6 grid-rows-1 h-screen w-[calc(max(130vw,1260px))] animation-infinite-grid top-[50%] left-[50%]"
        aria-label="An infinite scrolling grid with various design related tweets."
      >
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden xl:block">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden 3xl:block">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden 5xl:block">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>

      <main className="bg-white top-[50%] left-[50%] fixed z-50 -translate-x-[50%] -translate-y-[50%] p-8 invisible">
        <div className={clsx(SIDE_OVERLAY_STYLE, "h-32 w-full top-full left-0 bg-gradient-to-b gradient-mask-b-20")} />
        <div
          className={clsx(SIDE_OVERLAY_STYLE, "h-32 w-full bottom-full left-0 bg-gradient-to-t gradient-mask-t-20")}
        />
        <div className={clsx(SIDE_OVERLAY_STYLE, "w-32 h-full top-0 left-full bg-gradient-to-r gradient-mask-r-20")} />
        <div className={clsx(SIDE_OVERLAY_STYLE, "w-32 h-full top-0 right-full bg-gradient-to-l gradient-mask-l-20")} />

        <h1 className="text-4xl font-semibold mb-4 text-center">Twitter Widget for Figma/FigJam</h1>
        <p className="text-2xl text-gray-600 font-medium text-center mb-16">Embed any tweets in figma</p>
        <a
          className="flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer mt-16 mb-20"
          href="https://www.figma.com/community/widget/1167909952592149014"
          target="_blank"
          rel="noreferrer"
        >
          <FigmaIcon />
          Install for free
        </a>

        <footer className="flex flex-grow mt-20 mb-10">
          <div className="mt-auto font-medium text-gray-500">
            Crafted with care by <span className="font-semibold text-gray-600">Alexandru</span>
          </div>
        </footer>
      </main>
    </>
  )
}
