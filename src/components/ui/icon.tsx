import { cn } from '@/lib/utils'
import React from 'react'

import type { IconBaseProps } from 'react-icons'

import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import * as MdIcons from 'react-icons/md'
import * as SiIcons from 'react-icons/si'

type MdIconNames = keyof typeof MdIcons
type FaIconNames = keyof typeof FaIcons
type FiIconNames = keyof typeof FiIcons
type SiIconNames = keyof typeof SiIcons
type AiIconNames = keyof typeof AiIcons

export type IconNames =
  | MdIconNames
  | AiIconNames
  | FaIconNames
  | SiIconNames
  | FiIconNames

export type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export type IconsProps = IconBaseProps & {
  name: IconNames
  ref?: React.ForwardedRef<SVGElement>
  size?: IconSizes
  onClick?: () => void
}

export type IconType = (props: IconsProps) => JSX.Element

export const iconSizesMap = new Map<IconSizes | string | undefined, string>([
  ['xs', '0.75rem'], // 12px
  ['sm', '1rem'], // 16px
  ['md', '1.5rem'], // 24px
  ['lg', '2rem'], // 32px
  ['xl', '2.625rem'], // 42px
])

export const Icon = React.forwardRef<
  React.ElementRef<IconType>,
  React.ComponentPropsWithoutRef<IconType>
>(({ name, size, ...props }, ref) => {
  const namePreffix = name.slice(0, 2)
  const iconSize = iconSizesMap.get(size) ?? size

  const iconsCollectionMap: Record<string, any> = {
    Md: MdIcons,
    Fa: FaIcons,
    Fi: FiIcons,
    Si: SiIcons,
    Ai: AiIcons,
  }
  const iconsCollection = iconsCollectionMap[namePreffix]
  const IconByName = iconsCollection[name]

  return (
    <IconByName
      {...props}
      ref={ref}
      size={iconSize}
      className={cn(props.onClick ? 'cursor-pointer' : '', props.className)}
    />
  )
})
Icon.displayName = 'Icon'
