import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const SmoothScroll = ({ children }) => {
  const rafIdRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    })

    lenisRef.current = lenis

    const raf = (time) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      if (lenisRef.current) lenisRef.current.destroy()
    }
  }, [])

  return children
}

export default SmoothScroll
