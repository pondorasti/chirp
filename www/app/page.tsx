import clsx from "clsx"
import { shuffleArray } from "../lib/utils"
import { ITweet } from "../pages/api/tweet/[id]"
import { FigmaIcon } from "./components/icons"
import { TiltWrapper } from "./components/tilt"
import { Transition } from "./components/transition"
import { PARALLAX_STYLE, TRANSFORM_ANIMATION, Tweet } from "./components/tweet"
import { TWEETS } from "./data"

const SIDE_OVERLAY_STYLE =
  "pointer-events-none fixed z-10 from-white to-transparent will-change-transform backdrop-blur-[1px]"

export const runtime = "experimental-edge"

export default async function Home() {
  const tweets = shuffleArray(TWEETS)
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

      <Transition
        className="top-[50%] left-[50%] fixed z-50 -translate-x-[50%] -translate-y-[50%]"
        as="main"
        appear
        show
        enter="transition-[filter,opacity] ease-in-out duration-1000"
        enterFrom="blur-2xl opacity-0"
        enterTo="blur-none opacity-100"
      >
        <div className={clsx("hover:scale-[1.03]", TRANSFORM_ANIMATION)}>
          <TiltWrapper className="[transform-style:preserve-3d]">
            <div
              className={clsx(
                "group bg-white/[0.98] p-10 border border-black/5 bg-clip-padding rounded-[32px] font-inter shadow-xl hover:shadow-2xl [transform-style:preserve-3d]",
                TRANSFORM_ANIMATION
              )}
            >
              <h1 className={clsx("text-3xl font-semibold mb-4 text-center", PARALLAX_STYLE, TRANSFORM_ANIMATION)}>
                Widget for Figma/FigJam
              </h1>
              <p
                className={clsx(
                  "text-xl text-gray-600 font-medium text-center mb-12",
                  PARALLAX_STYLE,
                  TRANSFORM_ANIMATION
                )}
              >
                Embed your favorite tweets
              </p>
              <a
                className={clsx(
                  "flex items-center justify-center px-6 py-3 bg-twitter-blue rounded-full text-gray-50 gap-2 font-semibold text-lg w-fit mx-auto cursor-pointer shadow-lg group-hover:shadow-xl group-hover:shadow-twitter-blue/50 shadow-twitter-blue/50",
                  PARALLAX_STYLE,
                  TRANSFORM_ANIMATION
                )}
                href="https://www.figma.com/community/widget/1167909952592149014"
                target="_blank"
                rel="noreferrer"
              >
                <FigmaIcon />
                Install for free
              </a>
            </div>
          </TiltWrapper>
        </div>
      </Transition>
    </>
  )
}
