"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400) 

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-900 mb-4"></div>
        <p className="text-green-900 font-medium">Loading...</p>
      </div>
    </div>
  )
}
