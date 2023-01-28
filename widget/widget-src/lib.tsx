export const openURL = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    figma.showUI(__html__, { visible: false })
    figma.ui.postMessage({ type: "open-url", url })
    figma.ui.onmessage = () => {
      resolve(void 0)
    }
  })
}

export interface Tweet {
  id: string
  text: string
  publicMetrics: {
    retweetCount: number
    likeCount: number
    replyCount: number
  }
  author: {
    name: string
    username: string
    verified: boolean
    profileImageURI?: string
  }
  media: {
    id: string
    height: number
    width: number
    altText?: string
    type: "photo" | "video"
    uri: string
    url: string
  }[]
}

export const fetchTweet = (id: string): Promise<Tweet> => {
  return new Promise((resolve) => {
    figma.showUI(__html__, { visible: false })
    figma.ui.postMessage({ type: "fetch-tweet", id })

    figma.ui.onmessage = (tweet) => {
      resolve(tweet)
    }
  })
}
