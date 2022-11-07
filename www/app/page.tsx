import FigmaIcon from "./FigmaIcon"

const tweetIds = [
  "1334334544598740994",
  "826528907381739520",
  "1504190572336087040",
  "1189444653059174401",
  "1588943426229522433",
  "1312386219599433729",
  "1582805523484680192",
]

async function getTweets() {
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
    <div className="flex flex-col items-center min-h-screen">
      <main>
        <h1 className="text-4xl font-medium m-16">Twitter Widgets for Figma/FigJam</h1>

        <a className="flex items-center">
          <FigmaIcon />
          Try for free
        </a>
      </main>

      <footer className="flex-grow">Crafted with care by Alexandru</footer>
    </div>
  )
}
