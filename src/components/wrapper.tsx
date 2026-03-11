'use client'

import addEventListener from '@/app/utils/event-listeners'
import React, { useEffect } from 'react'

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

// const maxWidthMap: Record<NonNullable<WrapperProps['maxW']>, string> = {
//   sm: 'max-w-sm',
//   md: 'max-w-md',
//   lg: 'max-w-3xl',
//   xl: 'max-w-5xl',
// }

  const classes = ({
  className = '',
  center = false,
  // maxW = 'lg',
  padded = true,
}) => [
    'w-full',
    padded ? 'p-4' : '',
    center ? 'mx-auto text-center' : '',
    // maxWidthMap[maxW],
    className,
  ]
    .filter(Boolean)
    .join(' ')

export const Wrapper: React.FC<WrapperProps> = (props) => {
  useEffect(() => addEventListener(document.body), []);

  return (
    <div className={ classes(props)}>
      {props.children}
    </div>
  )
}

export default Wrapper
