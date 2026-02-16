import React from 'react'

export type WrapperProps = {
  children?: React.ReactNode
  /** Additional classes passed through to the root element */
  className?: string
  /** Center the content horizontally and apply `mx-auto` */
  center?: boolean
  /** Choose a max width (maps to a Tailwind class) */
  maxW?: 'sm' | 'md' | 'lg' | 'xl'
  /** Toggle default padding */
  padded?: boolean
}

const maxWidthMap: Record<NonNullable<WrapperProps['maxW']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

/**
 * Basic Wrapper component — small, well-typed, and easy to extend.
 * - Renders a `div` with sensible Tailwind defaults
 * - Accepts `className`, `center`, `maxW`, and `padded`
 */
export const Wrapper: React.FC<WrapperProps> = ({
  children,
  className = '',
  center = false,
  maxW = 'lg',
  padded = true,
}) => {
  const classes = [
    'w-full',
    padded ? 'p-4' : '',
    center ? 'mx-auto text-center' : '',
    maxWidthMap[maxW],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}

export default Wrapper
