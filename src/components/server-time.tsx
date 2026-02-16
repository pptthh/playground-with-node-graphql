'use client'

import { useEffect, useState } from 'react'

export default function ServerTime() {
  const [time, setTime] = useState<string>('')
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

  if (loading) return <div data-cy="loading">Loading...</div>
  return <div data-cy="server-time">{time}</div>
}
