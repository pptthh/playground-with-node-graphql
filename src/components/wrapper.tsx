'use client'

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
  const handleEvent = (eventType: string, data: Record<string, unknown> = {}): void => {
    console.debug(`Event: ${eventType}`, data)
  }

  const handleMouseEvent = (event: React.MouseEvent<HTMLDivElement>, type: string): void => {
    handleEvent(type, { x: event.clientX, y: event.clientY })
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.currentTarget
    handleEvent('scroll', { scrollTop: target.scrollTop, scrollLeft: target.scrollLeft })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    handleEvent('keydown', { key: event.key, code: event.code })
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    handleEvent('keyup', { key: event.key, code: event.code })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    handleEvent('keypress', { key: event.key, code: event.code })
  }

  const classes = [
    'w-full',
    padded ? 'p-4' : '',
    center ? 'mx-auto text-center' : '',
    maxWidthMap[maxW],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      tabIndex={0}
      onMouseMove={(event) => handleMouseEvent(event, 'mousemove')}
      onClick={(event) => handleMouseEvent(event, 'click')}
      onMouseDown={(event) => handleMouseEvent(event, 'mousedown')}
      onMouseUp={(event) => handleMouseEvent(event, 'mouseup')}
      onMouseEnter={() => handleEvent('mouseenter')}
      onMouseLeave={() => handleEvent('mouseleave')}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onKeyPress={handleKeyPress}
    >
      {children}
    </div>
  )
}

export default Wrapper
