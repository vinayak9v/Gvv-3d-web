'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 50)
    const t2 = setTimeout(refresh, 500)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('load', refresh)
    }
  }, [])
  return null
}
