import { externalLinkIcon, refreshIcon, slidersIcon } from "./Icons"

const { widget } = figma
const { useEffect, usePropertyMenu, useSyncedState, AutoLayout, Input, Text } = widget

function Widget() {
  const [tweetIdInput, setTweetIdInput] = useSyncedState("tweetIdInput", "")

  usePropertyMenu(
    [
      {
        tooltip: "Open Tweet",
        propertyName: "open",
        itemType: "action",
        icon: externalLinkIcon,
      },
      {
        tooltip: "Refresh Tweet",
        propertyName: "refresh",
        itemType: "action",
        icon: refreshIcon,
      },
      {
        tooltip: "Edit Tweet",
        propertyName: "edit",
        itemType: "action",
        icon: slidersIcon,
      },
    ],
    (e) => {
      console.log(e.propertyName)
    }
  )

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "showToast") {
        figma.notify("Hello widget")
      }
      if (msg.type === "close") {
        figma.closePlugin()
      }
    }
  })

  return (
    <AutoLayout
      name="body"
      padding={32}
      spacing={32}
      cornerRadius={16}
      direction="vertical"
      horizontalAlignItems="start"
      verticalAlignItems="center"
      fill="#ffffff"
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.15 },
        offset: { x: 0, y: 4 },
        blur: 12,
      }}
    >
      <Text fontSize={24} fontWeight={600}>
        Chirp
      </Text>

      <AutoLayout
        name="input-container"
        spacing={8}
        direction="vertical"
        horizontalAlignItems="start"
        verticalAlignItems="center"
      >
        <Text fontSize={16} fontWeight={500}>
          Tweet ID
        </Text>
        <Input
          value={tweetIdInput}
          placeholder="1585396100026208257"
          onTextEditEnd={(e) => {
            setTweetIdInput(e.characters)
          }}
          fontSize={16}
          fill="#525252"
          inputFrameProps={{
            fill: "#f5f5f5",
            cornerRadius: 12,
            padding: 8,
          }}
          width={320}
          inputBehavior="wrap"
        />
      </AutoLayout>
      <AutoLayout
        name="create-tweet"
        padding={12}
        cornerRadius={16}
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        width="fill-parent"
        fill="#1d9bf0"
        onClick={
          // Resolving the promise, closing the Iframe window, or calling
          // "figma.closePlugin()" will terminate the code.
          async () =>
            new Promise((resolve) => {
              console.log("boop")
              figma.showUI(__html__, { visible: false })
              figma.ui.postMessage({ type: "networkRequest" })
              figma.ui.onmessage = (tweet) => {
                console.log({ tweet })
                resolve(null)
              }
            })
        }
      >
        <Text fill="#fff" fontWeight={600} fontSize={18}>
          Embed
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Widget)
