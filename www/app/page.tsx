import { ITweet } from "../pages/api/tweet/[id]"
import FigmaIcon from "./components/FigmaIcon"

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
      const res = await fetch("https://chirp-self.vercel.app/api/tweet/" + id, {
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

  console.log({ tweets })

  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-10">
      <main>
        <h1 className="text-4xl font-medium mb-4">Twitter Widgets for Figma/FigJam</h1>
        <p className="text-xl text-gray-600 text-center mb-8">Embed any tweets in figma</p>

        <a className="flex items-center justify-center px-6 py-3 bg-blue-500 rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer mb-20">
          <FigmaIcon />
          Install for free
        </a>

        <div className="bg-white p-8 flex flex-col gap-5 rounded-3xl shadow-lg font-inter max-w-md mx-auto">
          <div className="flex gap-4">
            <img
              src={tweets[0].author.profileImageURI}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="text-md font-medium">{tweets[0].author.name}</h3>
              <h4>@{tweets[0].author.username}</h4>
            </div>
          </div>

          <p>{tweets[0].text}</p>
        </div>
      </main>

      <footer className="flex flex-grow mt-20 mb-10">
        <div className="mt-auto">Crafted with care by Alexandru</div>
      </footer>
    </div>
  )
}
