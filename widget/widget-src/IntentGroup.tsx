import { textSecondary } from "./Icons"

const { widget } = figma
const { AutoLayout, Text, SVG, Rectangle } = widget

export default function IntentGroup({
  name,
  count,
  foregroundFill,
  backgroundFill,
  icon,
  activeIcon,
  onClick,
}: {
  name: string
  count: number
  foregroundFill: string
  backgroundFill: string
  icon: string
  activeIcon: string
  onClick: () => Promise<void>
}) {
  return (
    <AutoLayout
      name={name}
      spacing={8}
      padding={4}
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      opacity={1}
      hoverStyle={{ opacity: 1 }}
      onClick={onClick}
    >
      <SVG src={icon} width={18} height={18} positioning="absolute" />
      <Rectangle
        width={26}
        height={26}
        cornerRadius={24}
        positioning="absolute"
        fill={backgroundFill}
        opacity={0}
        hoverStyle={{ opacity: 1 }}
      />
      <SVG src={activeIcon} width={18} height={18} opacity={0} hoverStyle={{ opacity: 1 }} />
      <Text
        fontSize={12}
        fontWeight={400}
        fill={textSecondary}
        hoverStyle={{ fill: foregroundFill }}
      >
        {count > 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString()}
      </Text>
    </AutoLayout>
  )
}
