import clsx from "clsx"
import Image from "next/image"
import { ITweet } from "../../pages/api/tweet/[id]"
import { HeartIcon, ImpressionIcon, ReplyIcon, RetweetIcon, TwitterIcon } from "./icons"
import { TiltWrapper } from "./tilt"

const TRANSFORM_ANIMATION =
  "transition-all duration-[600ms] [transition-timing-function:ease] will-change-transform"
const PARALLAX_STYLE = "group-hover:[transform:translateZ(15px)]"

interface IntentGroupProps {
  icon: React.ReactNode
  count: number
  label: string
  href: string
  foregroundColor: string
  backgroundColor: string
}

const IntentGroup: React.FC<Readonly<IntentGroupProps>> = ({
  icon,
  count,
  label,
  href,
  foregroundColor,
  backgroundColor,
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

interface TweetProps {
  tweet: ITweet
}

export const Tweet: React.FC<Readonly<TweetProps>> = ({ tweet }) => (
  <div
    className={clsx(
      "hover:scale-[1.03] mb-5 mr-5 hover:translate-x-1 hover:-translate-y-1",
      TRANSFORM_ANIMATION
    )}
  >
    <TiltWrapper className="[transform-style:preserve-3d]">
      <div
        className={clsx(
          "group bg-white p-8 flex flex-col gap-5 rounded-[32px] font-inter max-w-md shadow-md hover:shadow-xl [transform-style:preserve-3d]",
          TRANSFORM_ANIMATION
        )}
      >
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
      </div>
    </TiltWrapper>
  </div>
)
