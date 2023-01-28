import { playIcon, TWITTER_BRAND_BLUE } from "./icons"
import { openURL, Tweet } from "./lib"

const { widget } = figma
const { AutoLayout, Image, Frame, Rectangle, SVG } = widget

const CORNER_RADIUS = 12
const ADJACENT_PADDING = 2
const PLAY_BUTTON_CONTAINER = 64
const PLAY_BUTTON_SIZE = 42

const MAX_WIDTH = 320
const MIN_WIDTH = (MAX_WIDTH + ADJACENT_PADDING) / 2

const COMPACT_RATIO = 1.8

export const MediaGroup = ({ media }: { media: Tweet["media"] }) => {
  switch (media.length) {
    case 0: {
      return null
    }

    case 1: {
      const item = media[0]
      const aspectRatio = item.width / item.height
      const width = Math.min(MAX_WIDTH, item.width)
      const height = width / aspectRatio

      return (
        <Frame
          width={width}
          height={height}
          cornerRadius={CORNER_RADIUS}
          onClick={() => openURL(item.url)}
        >
          <Image src={item.uri} width={width} height={height} />
          {item.type === "video" && (
            <>
              <Rectangle
                width={PLAY_BUTTON_CONTAINER}
                height={PLAY_BUTTON_CONTAINER}
                x={(width - PLAY_BUTTON_CONTAINER) / 2}
                y={(height - PLAY_BUTTON_CONTAINER) / 2}
                cornerRadius={PLAY_BUTTON_CONTAINER}
                fill={TWITTER_BRAND_BLUE}
                strokeWidth={3}
                stroke="#fff"
              />
              <SVG
                src={playIcon}
                width={PLAY_BUTTON_SIZE}
                height={PLAY_BUTTON_SIZE}
                x={(width - PLAY_BUTTON_SIZE) / 2 + 2}
                y={(height - PLAY_BUTTON_SIZE) / 2}
              />
            </>
          )}
        </Frame>
      )
    }

    case 2: {
      // Find min height element
      const maxHeight = media.reduce((_, item) => {
        const aspectRatio = item.width / item.height
        const width = Math.min(MIN_WIDTH, item.width)
        const height = width / aspectRatio

        return height
      }, 0)

      return (
        <AutoLayout
          name="media-container"
          direction="horizontal"
          spacing={ADJACENT_PADDING}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          {media.map((item, index) => (
            <Image
              key={item.id}
              src={item.uri}
              width={MIN_WIDTH}
              height={maxHeight}
              cornerRadius={{
                topLeft: index === 0 ? CORNER_RADIUS : 0,
                topRight: index === 1 ? CORNER_RADIUS : 0,
                bottomLeft: index === 0 ? CORNER_RADIUS : 0,
                bottomRight: index === 1 ? CORNER_RADIUS : 0,
              }}
              onClick={() => openURL(item.url)}
            />
          ))}
        </AutoLayout>
      )
    }

    case 3: {
      return (
        <AutoLayout
          name="media-container"
          direction="horizontal"
          spacing={ADJACENT_PADDING}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          {media.slice(0, 1).map((item) => (
            <Image
              key={item.id}
              src={item.uri}
              width={MIN_WIDTH}
              height={(MIN_WIDTH / COMPACT_RATIO) * 2 + ADJACENT_PADDING}
              cornerRadius={{
                topLeft: CORNER_RADIUS,
                topRight: 0,
                bottomLeft: CORNER_RADIUS,
                bottomRight: 0,
              }}
              onClick={() => openURL(item.url)}
            />
          ))}
          <AutoLayout
            name="media-col-two"
            direction="vertical"
            spacing={ADJACENT_PADDING}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(1, 3).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={MIN_WIDTH}
                height={MIN_WIDTH / COMPACT_RATIO}
                cornerRadius={{
                  topLeft: 0,
                  topRight: index === 0 ? CORNER_RADIUS : 0,
                  bottomLeft: 0,
                  bottomRight: index === 1 ? CORNER_RADIUS : 0,
                }}
                onClick={() => openURL(item.url)}
              />
            ))}
          </AutoLayout>
        </AutoLayout>
      )
    }

    case 4: {
      return (
        <AutoLayout
          name="media-container"
          direction="vertical"
          spacing={ADJACENT_PADDING}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <AutoLayout
            name="media-row-one"
            direction="horizontal"
            spacing={ADJACENT_PADDING}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(0, 2).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={MIN_WIDTH}
                height={MIN_WIDTH / COMPACT_RATIO}
                cornerRadius={{
                  topLeft: index === 0 ? CORNER_RADIUS : 0,
                  topRight: index === 1 ? CORNER_RADIUS : 0,
                  bottomLeft: 0,
                  bottomRight: 0,
                }}
                onClick={() => openURL(item.url)}
              />
            ))}
          </AutoLayout>
          <AutoLayout
            name="media-row-two"
            direction="horizontal"
            spacing={ADJACENT_PADDING}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(2, 4).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={MIN_WIDTH}
                height={MIN_WIDTH / COMPACT_RATIO}
                cornerRadius={{
                  topLeft: 0,
                  topRight: 0,
                  bottomLeft: index === 0 ? CORNER_RADIUS : 0,
                  bottomRight: index === 1 ? CORNER_RADIUS : 0,
                }}
                onClick={() => openURL(item.url)}
              />
            ))}
          </AutoLayout>
        </AutoLayout>
      )
    }

    default: {
      return null
    }
  }
}
