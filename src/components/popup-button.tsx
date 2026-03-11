'use client'

import { useEffect, useRef, useState } from 'react'

type Position = { x: number; y: number }

function useDrag(open: boolean) {
  const [position, setPosition] = useState<Position | null>(null)
  const isDragging = useRef(false)
  const dragOffset = useRef<Position>({ x: 0, y: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect()
      dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (position === null) {
        setPosition({ x: rect.left, y: rect.top })
      }
      isDragging.current = true
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y })
      }
    }
    const handleMouseUp = () => {
      isDragging.current = false
    }

    if (open) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [open])

  const reset = () => setPosition(null)

  const style: React.CSSProperties = position
    ? { left: position.x, top: position.y }
    : { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }

  return { dialogRef, handleDragStart, reset, style }
}

export const PopupButton: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { dialogRef, handleDragStart, reset, style } = useDrag(open)

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      <button
        data-cy="popup-open"
        onClick={() => setOpen(true)}
        className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
      >
        Open Popup
      </button>

      {open && (
        <>
          <div
            aria-label="Close popup"
            data-cy="popup-overlay"
            className="fixed inset-0 z-50 bg-black/50"
            role="button"
            tabIndex={0}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { handleClose() }
            }}
          />
          <div
            ref={dialogRef}
            aria-labelledby="popup-title"
            aria-modal="true"
            data-cy="popup-dialog"
            className="fixed z-50 w-[200px] rounded-xl bg-white shadow-xl dark:bg-zinc-900"
            role="dialog"
            style={style}
          >
            <button
              className="w-full cursor-grab select-none rounded-t-xl px-5 pb-3 pt-5 text-left active:cursor-grabbing"
              onMouseDown={handleDragStart}
            >
              <h2 id="popup-title" className="text-base font-semibold text-black dark:text-zinc-50">
                Hello from the popup!
              </h2>
            </button>
            <div className="px-5 pb-5">
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                This is a popup window. Drag the title to move it.
              </p>
              <button
                data-cy="popup-close"
                onClick={handleClose}
                className="flex h-8 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
