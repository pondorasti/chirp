import { TWITTER_GRAY_SECONDARY } from "./icons"

const { widget } = figma
const { AutoLayout, Text, SVG, Rectangle } = widget

const ICON_SIZE = 20
const UNDERLAY_SIZE = 34
export const UNDERLAY_OFFSET = (UNDERLAY_SIZE - ICON_SIZE) / 2

export const IntentGroup = ({
  name,
  count,
  foregroundFill,
  backgroundFill,
  icon,
  activeIcon,
  onClick,
  isFirst = false,
}: {
  name: string
  count: number
  foregroundFill: string
  backgroundFill: string
  icon: string
  activeIcon: string
  onClick: () => Promise<void>
  isFirst?: boolean
}) => (
  <AutoLayout
    name={name}
    spacing={UNDERLAY_OFFSET + 4}
    padding={{
      top: 0,
      right: UNDERLAY_OFFSET,
      bottom: UNDERLAY_OFFSET,
      left: isFirst ? 0 : UNDERLAY_OFFSET,
    }}
    direction="horizontal"
    horizontalAlignItems="center"
    verticalAlignItems="center"
    opacity={1}
    hoverStyle={{ opacity: 1 }}
    onClick={onClick}
    overflow="visible"
  >
    <SVG src={icon} width={ICON_SIZE} height={ICON_SIZE} positioning="absolute" />
    <Rectangle
      width={UNDERLAY_SIZE}
      height={UNDERLAY_SIZE}
      cornerRadius={UNDERLAY_SIZE}
      positioning="absolute"
      x={isFirst ? -UNDERLAY_OFFSET : 0}
      y={-UNDERLAY_OFFSET}
      fill={backgroundFill}
      opacity={0}
      hoverStyle={{ opacity: 1 }}
    />
    <SVG
      src={activeIcon}
      width={ICON_SIZE}
      height={ICON_SIZE}
      opacity={0}
      hoverStyle={{ opacity: 1 }}
    />
    <Text
      fontSize={13}
      fontWeight={400}
      fill={TWITTER_GRAY_SECONDARY}
      hoverStyle={{ fill: foregroundFill }}
      fontFamily="Inter"
    >
      {count > 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString()}
    </Text>
  </AutoLayout>
)
