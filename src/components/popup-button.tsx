'use client'

import { useState } from 'react'

export const PopupButton: React.FC = () => {
  const [open, setOpen] = useState(false)

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
        <div
          aria-label="Close popup"
          data-cy="popup-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            if (e.target === e.currentTarget) { setOpen(false) }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { setOpen(false) }
          }}
        >
          <div
            aria-labelledby="popup-title"
            aria-modal="true"
            data-cy="popup-dialog"
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900"
            role="dialog"
          >
            <h2 id="popup-title" className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              Hello from the popup!
            </h2>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              This is a popup window. Click the button below or the backdrop to close it.
            </p>
            <button
              data-cy="popup-close"
              onClick={() => setOpen(false)}
              className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
