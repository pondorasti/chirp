import { textSecondary } from "./Icons"

const { widget } = figma
const { AutoLayout, Text, SVG, Rectangle } = widget

const iconSize = 20
const underlaySize = 32
const underlayOffset = (underlaySize - iconSize) / 2

export default function IntentGroup({
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
}) {
  return (
    <AutoLayout
      name={name}
      spacing={8}
      padding={{
        top: 0,
        right: underlayOffset,
        bottom: underlayOffset,
        left: isFirst ? 0 : underlayOffset,
      }}
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      opacity={1}
      hoverStyle={{ opacity: 1 }}
      onClick={onClick}
      overflow="visible"
    >
      <SVG src={icon} width={iconSize} height={iconSize} positioning="absolute" />
      <Rectangle
        width={underlaySize}
        height={underlaySize}
        cornerRadius={underlaySize}
        positioning="absolute"
        x={isFirst ? -underlayOffset : 0}
        y={-underlayOffset}
        fill={backgroundFill}
        opacity={0}
        hoverStyle={{ opacity: 1 }}
      />
      <SVG
        src={activeIcon}
        width={iconSize}
        height={iconSize}
        opacity={0}
        hoverStyle={{ opacity: 1 }}
      />
      <Text
        fontSize={13}
        fontWeight={400}
        fill={textSecondary}
        hoverStyle={{ fill: foregroundFill }}
        fontFamily="Inter"
      >
        {count > 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString()}
      </Text>
    </AutoLayout>
  )
}
