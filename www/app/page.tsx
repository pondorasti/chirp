import { ITweet } from "../pages/api/tweet/[id]"
import FigmaIcon from "./components/FigmaIcon"
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

function HeartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
      </g>
    </svg>
  )
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
