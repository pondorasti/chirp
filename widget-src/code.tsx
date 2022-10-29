const { widget } = figma
const { useEffect, usePropertyMenu, useSyncedState, AutoLayout, Input, Text } = widget

const refreshIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline>
<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
</svg>
`

const externalLinkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
<polyline points="15 3 21 3 21 9"></polyline>
<line x1="10" y1="14" x2="21" y2="3"></line>
</svg>`

const slidersIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
<line x1="4" y1="21" x2="4" y2="14"></line>
<line x1="4" y1="10" x2="4" y2="3"></line>
<line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
<line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
<line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line>
<line x1="17" y1="16" x2="23" y2="16"></line>
</svg>
`

function Widget() {
  const [text, setText] = useSyncedState("text", "")

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
        onClick={
          // Resolving the promise, closing the Iframe window, or calling
          // "figma.closePlugin()" will terminate the code.
          async () =>
            new Promise((resolve) => {
              console.log("boop")
              figma.showUI(__html__, { visible: false })
              figma.ui.postMessage({ type: "networkRequest" })
              figma.ui.onmessage = (msg) => {
                console.log({ msg })
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
