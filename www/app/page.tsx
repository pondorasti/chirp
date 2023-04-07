import clsx from "clsx"
import { ITweet } from "../pages/api/tweet/[id]"
import { FigmaIcon } from "./components/icons"
import { Tweet } from "./components/tweet"

// "1504190572336087040",
//   "1189444653059174401",
//   "1588943426229522433",
//   "1312386219599433729",
//   "1582805523484680192",
//   "1334334544598740994",
//   "826528907381739520",

const tweetIds = [
  "1617478463916748801",
  "1587918615591854080",
  "1616842188259819523",
  "1640675018043432961",
  "1619368910318632961",
  "1593056767126405120",
  "1550494541874020353",
  "1582440503374934016",
  "1590914253254701057",
  "1617942815409065984",
  "1640745044645748736",
  "1619833149898502144",
  "1619793057423196160",
  "1615846054024331264",
  "1606386119389679629",
  "1599462078569324545",
  "1617678030964682753",
  "1602341013132963840",
  "1615363412107886592",
  "1525522007063928833",
  "1618195529284071430",
  "1605231589717266432",
  "1638136335880921090",
]

const shuffleArray = <T,>(array: Array<T>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

async function getTweets(): Promise<ITweet[]> {
  const ids = tweetIds
  const tweets = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch("https://chirp.alexandru.so/api/tweet/" + id, {
        next: { revalidate: 31536000 },
      })
      const data = await res.json()
      return data
    })
  )

  shuffleArray(tweets)

  return tweets
}

const SIDE_OVERLAY_STYLE =
  "pointer-events-none fixed z-10 from-white to-transparent will-change-transform backdrop-blur-[1px]"

export default async function Home() {
  const tweets = await getTweets()
  const buckets = Array.from({ length: 6 }, () => [] as ITweet[])
  tweets.forEach((tweet, index) => {
    buckets[index % 6].push(tweet)
  })

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
        className="grid fixed h-screen animation-infinite-grid -left-[202px] w-[808px] sm:w-[1212px] md:w-[1616px] lg:w-[2020px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        aria-label="An infinite scrolling grid with various design related tweets."
      >
        <div>
          {buckets[0].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div>
          {buckets[1].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div>
          {buckets[2].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden sm:block">
          {buckets[3].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden md:block">
          {buckets[4].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className="hidden lg:block">
          {buckets[5].map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
      {/* 
      <main className="bg-white top-[50%] left-[50%] fixed z-50 -translate-x-[50%] -translate-y-[50%] p-8">
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
      </main> */}
    </>
  )
}
