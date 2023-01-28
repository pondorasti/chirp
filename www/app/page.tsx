import { ITweet } from "../pages/api/tweet/[id]"
import { FigmaIcon, HeartIcon } from "./components/icons"
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

export default async function Home() {
  const tweets = await getTweets()

  console.log({ tweets })

  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-10">
      <main>
        <h1 className="text-4xl font-semibold mb-4">Twitter Widgets for Figma/FigJam</h1>
        <p className="text-2xl text-gray-600 font-medium text-center mb-8">
          Embed any tweets in figma
        </p>

        <div className="bg-white p-8 flex flex-col gap-5 rounded-3xl shadow-lg font-inter max-w-md mx-auto">
          <div className="flex gap-4">
            {tweets[0].author.profileImageURI && (
              <Image
                src={tweets[0].author.profileImageURI}
                alt={`${tweets[0].author.name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-md font-medium">{tweets[0].author.name}</h3>
              <h4>@{tweets[0].author.username}</h4>
            </div>
          </div>

          <p>{tweets[0].text}</p>

          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 items-center cursor-pointer hover:text-twitter-red group">
              <div className="group-hover:bg-twitter-faded-red p-2 rounded-full">
                <HeartIcon />
              </div>
              <span>{tweets[0].publicMetrics.likeCount}</span>
            </div>
            <HeartIcon />
            <HeartIcon />
          </div>
        </div>

        <a className="flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer mb-20">
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
