'use client'

import { useEffect, useState } from 'react'

export default function ServerClock({ live = false }: { live?: boolean }) {
  const [time, setTime] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ serverTime }' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTime(new Date(data.data.serverTime))
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!live || !time) return
    const interval = setInterval(() => {
      setTime((prev) => prev ? new Date(prev.getTime() + 1000) : null)
    }, 1000)
    return () => clearInterval(interval)
  }, [live, time])

  if (loading) return <div data-cy="loading">Loading...</div>
  return <div data-cy={live ? "live-clock" : "server-time"}>{time?.toISOString()}</div>
}
