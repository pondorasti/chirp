import { openURL, Tweet } from "./code"

const { widget } = figma
const { AutoLayout, Image } = widget

const cornerRadius = 12
const adjacentPadding = 2

const maxWidth = 320
const minWidth = (maxWidth + adjacentPadding) / 2

const compactRatio = 1.8

export default function MediaGroup({ media }: { media: Tweet["media"] }) {
  switch (media.length) {
    case 0: {
      return null
    }

    case 1: {
      const item = media[0]
      const aspectRatio = item.width / item.height
      const width = Math.min(maxWidth, item.width)
      const height = width / aspectRatio

      return (
        <Image
          src={item.uri}
          width={width}
          height={height}
          cornerRadius={cornerRadius}
          onClick={() => openURL(item.url)}
        />
      )
    }

    case 2: {
      // Find min height element
      const maxHeight = media.reduce((_, item) => {
        const aspectRatio = item.width / item.height
        const width = Math.min(minWidth, item.width)
        const height = width / aspectRatio

        return height
      }, 0)

      return (
        <AutoLayout
          name="media-container"
          direction="horizontal"
          spacing={adjacentPadding}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          {media.map((item, index) => (
            <Image
              key={item.id}
              src={item.uri}
              width={minWidth}
              height={maxHeight}
              cornerRadius={{
                topLeft: index === 0 ? cornerRadius : 0,
                topRight: index === 1 ? cornerRadius : 0,
                bottomLeft: index === 0 ? cornerRadius : 0,
                bottomRight: index === 1 ? cornerRadius : 0,
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
          spacing={adjacentPadding}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          {media.slice(0, 1).map((item) => (
            <Image
              key={item.id}
              src={item.uri}
              width={minWidth}
              height={(minWidth / compactRatio) * 2 + adjacentPadding}
              cornerRadius={{
                topLeft: cornerRadius,
                topRight: 0,
                bottomLeft: cornerRadius,
                bottomRight: 0,
              }}
              onClick={() => openURL(item.url)}
            />
          ))}
          <AutoLayout
            name="media-col-two"
            direction="vertical"
            spacing={adjacentPadding}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(1, 3).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={minWidth}
                height={minWidth / compactRatio}
                cornerRadius={{
                  topLeft: 0,
                  topRight: index === 0 ? cornerRadius : 0,
                  bottomLeft: 0,
                  bottomRight: index === 1 ? cornerRadius : 0,
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
          spacing={adjacentPadding}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <AutoLayout
            name="media-row-one"
            direction="horizontal"
            spacing={adjacentPadding}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(0, 2).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={minWidth}
                height={minWidth / compactRatio}
                cornerRadius={{
                  topLeft: index === 0 ? cornerRadius : 0,
                  topRight: index === 1 ? cornerRadius : 0,
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
            spacing={adjacentPadding}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            {media.slice(2, 4).map((item, index) => (
              <Image
                key={item.id}
                src={item.uri}
                width={minWidth}
                height={minWidth / compactRatio}
                cornerRadius={{
                  topLeft: 0,
                  topRight: 0,
                  bottomLeft: index === 0 ? cornerRadius : 0,
                  bottomRight: index === 1 ? cornerRadius : 0,
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
