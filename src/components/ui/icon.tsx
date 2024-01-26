import { cn } from '@/lib/utils'
import React from 'react'

import type { IconBaseProps, IconType } from 'react-icons'

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

export type IconsProps<T> = IconBaseProps & {
  name: T
  ref?: React.ForwardedRef<SVGElement>
  size?: IconSizes
  onClick?: () => void
}

export const iconSizesMap = new Map<IconSizes | string | undefined, string>([
  ['xs', '0.75rem'], // 12px
  ['sm', '1rem'], // 16px
  ['md', '1.5rem'], // 24px
  ['lg', '2rem'], // 32px
  ['xl', '2.625rem'], // 42px
])

export function iconBuilder<T>(
  props: IconsProps<T>,
  reactIcons: { [name: string]: IconType },
) {
  const { name, size, className, ...rest } = props

  const iconSize = iconSizesMap.get(size) ?? size
  const Icon = reactIcons[name ?? '']

  return (
    <Icon
      size={iconSize}
      className={cn(rest.onClick ? 'cursor-pointer' : '', className)}
      {...rest}
    />
  )
}

const BuildedIcon = (props: IconsProps<IconNames>) => {
  const iconsCollectionMap: Record<string, any> = {
    Md: MdIcons,
    Fa: FaIcons,
    Fi: FiIcons,
    Si: SiIcons,
    Ai: AiIcons,
  }
  const preffix = props.name.slice(0, 2)
  const icons = iconsCollectionMap[preffix]
  return iconBuilder(props, icons)
}

export const Icon = React.forwardRef<
  React.ElementRef<typeof BuildedIcon>,
  React.ComponentPropsWithoutRef<typeof BuildedIcon>
>((props, ref) => <BuildedIcon ref={ref} {...props} />)
Icon.displayName = 'Icon'
