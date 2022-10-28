// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma
const { useEffect, usePropertyMenu, useSyncedState, AutoLayout, Input, Text } = widget

function Widget() {
  const [text, setText] = useSyncedState("text", "")

  usePropertyMenu(
    [
      {
        tooltip: "Open tweet",
        propertyName: "open",
        itemType: "action",
      },
      {
        tooltip: "Refresh",
        propertyName: "refresh",
        itemType: "action",
      },
      {
        tooltip: "Edit",
        propertyName: "edit",
        itemType: "action",
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
      <Text
        fontSize={24}
        fontWeight={600}
        // onClick={
        //   // Use async callbacks or return a promise to keep the Iframe window
        //   // opened. Resolving the promise, closing the Iframe window, or calling
        //   // "figma.closePlugin()" will terminate the code.
        //   () =>
        //     new Promise((resolve) => {
        //       figma.showUI(__html__)
        //     })
        // }
      >
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
          value={text}
          placeholder="158539610883"
          onTextEditEnd={(e) => {
            setText(e.characters)
          }}
          fontSize={16}
          fill="#525252"
          inputFrameProps={{
            fill: "#f5f5f5",
            // stroke: "#e5e5e5",
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
        onClick={() => {}}
      >
        <Text fill="#fff" fontWeight={600} fontSize={18}>
          Embed
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Widget)
