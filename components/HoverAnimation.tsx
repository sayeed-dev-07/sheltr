'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { GithubIcon, InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'

const HoverAnimation = ({
  text,
  logo = 'github',
  url
}: {
  text: string
  logo?: string
  url: string
}) => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  useGSAP(() => {
    // 1. Better selection within the scope
    const topText = buttonRef.current?.querySelector('.text-top')
    const bottomText = buttonRef.current?.querySelector('.text-bottom')

    if (!topText || !bottomText) return

    // 2. Create the timeline
    tl.current = gsap.timeline({ paused: true })
      .to(topText, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.out' // InOut feels slightly more natural for UI
      })
      .to(bottomText, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power3.out'
        },
        0 // Start at the same time
      )
  }, { scope: buttonRef })

  // 3. Optimized handlers
  const handleMouseEnter = () => tl.current?.timeScale(1).play()
  const handleMouseLeave = () => tl.current?.timeScale(1.2).reverse()

  return (
    <Link
      ref={buttonRef}
      href={url}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-x-2 justify-center group"
    >
      {/* 4. Added a slight transition to the icon for extra polish */}
      <div className="transition-transform duration-300 group-hover:scale-110 will-change-transform">
        {logo === 'github' ? <GithubIcon size={20} /> : <InstagramIcon size={20} />}
      </div>

      <p className="relative h-[1.2em] overflow-hidden leading-tight font-medium">
        <span className="text-top block will-change-transform">{text}</span>
        <span className="text-bottom will-change-transform block absolute left-0 top-full whitespace-nowrap">
          {text}
        </span>
      </p>
    </Link>
  )
}

export default HoverAnimation