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

  const classes = ({
  className = '',
  center = false,
  maxW = 'lg',
  padded = true,
}) => [
    'w-full',
    padded ? 'p-4' : '',
    center ? 'mx-auto text-center' : '',
    maxWidthMap[maxW],
    className,
  ]
    .filter(Boolean)
    .join(' ')

const eventHandler = (event: unknown, props?: unknown): void => {
  if (event instanceof UIEvent) {
    console.debug('Wrapper event type:', {event, props})
  }
}

const eventListenerTypes = [
  'mouseup',
  'mousedown',
  'mousemove',
  'mouseenter',
  'mouseout',
  'mouseleave',
  'mouseover',
  'click',
  'dblclick',
  'contextmenu',
  'keydown',
  'keyup',
  'touchstart',
  'touchend',
  'scroll',
  'scrollend',
  'resize',
  'load'
]

const addMouseEventListener = (displayObject: HTMLElement): void => {
  eventListenerTypes.map(
    eventType => displayObject.addEventListener(eventType, eventHandler)
  );
}

/**
 * Basic Wrapper component — small, well-typed, and easy to extend.
 * - Renders a `div` with sensible Tailwind defaults
 * - Accepts `className`, `center`, `maxW`, and `padded`
 */
export const Wrapper: React.FC<WrapperProps> = (props) => {
  if (typeof document.body !== 'undefined') {
    addMouseEventListener(document.body);
  }

  return (
    <div className={ classes(props)}>
      {props.children}
    </div>
  )
}

export default Wrapper
