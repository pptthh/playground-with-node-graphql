'use client'

import { useEffect, useState } from 'react'

const ONE_SECOND = 1000

export default function ServerClock({ live = false }: { live?: boolean }): React.JSX.Element {
  const [time, setTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ serverTime }' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTime(data.data.serverTime)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!live || time === null) {
      return
    }
    const interval = setInterval(() => {
      setTime((prev) => prev !== null ? prev + ONE_SECOND : null)
    }, ONE_SECOND)
    return () => clearInterval(interval)
  }, [live, time])

  if (loading) {
    return <div data-cy="loading">Loading...</div>
  }
  return <div data-cy={live ? "live-clock" : "server-time"}>{time !== null ? new Date(time).toISOString() : ''}</div>
}
