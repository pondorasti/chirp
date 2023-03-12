export { reportWebVitals } from "next-axiom"
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
  "1582805523484680192",
  "1617678030964682753",
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
  "1582805523484680192",
  "1617678030964682753",
]

async function getTweets(): Promise<ITweet[]> {
  const shuffledTweets = tweetIds.sort(() => 0.5 - Math.random())
  // const ids = shuffledTweets.slice(0, 7)
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

export default async function Home() {
  const tweets = await getTweets()

  return (
    <>
      <div className="pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

      <div className="grid grid-cols-5 grid-rows-1 h-screen w-[150vw] animation-infinite-grid">
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
      </div>

      {/* <div className="flex flex-col items-center min-h-screen pt-32 pb-10 px-6">
        <main className="contents">
          <h1 className="text-4xl font-semibold mb-4 text-center">
            Twitter Widget for Figma/FigJam
          </h1>
          <p className="text-2xl text-gray-600 font-medium text-center mb-16">
            Embed any tweets in figma
          </p>

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
      </div> */}
    </>
  )
}
