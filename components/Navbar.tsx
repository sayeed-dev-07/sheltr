/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(SplitText, ScrollSmoother)

const Navbar = () => {
  const menuTl = useRef<GSAPTimeline | null>(null)

  const { contextSafe } = useGSAP(() => {
    /* ---------------------------------------------
       INTRO NAVBAR ANIMATION
    --------------------------------------------- */
    const introTl = gsap.timeline({
      onStart: () => {
        // 1. Stop the smoother logic
        ScrollSmoother.get()?.paused(true);
        // 2. Hide the visual scrollbar
        document.body.style.overflow = 'hidden';
      },
      onComplete: () => {
        // 3. Restart the smoother logic
        ScrollSmoother.get()?.paused(false);
        // 4. Bring the scrollbar back
        document.body.style.overflow = 'auto';
      }
    })

    const split = SplitText.create('.intro-text', {
      type: 'words',
      mask: 'words',
    })

    // hide hamburger initially
    gsap.set('.hamburger', {
      y: 30,
      autoAlpha: 0,
    })

    introTl
      .from('.main', {
        height: '100vh',
        duration: 1.5,
        ease: 'power4.inOut',
      }, 2)
      .fromTo(
        split.words,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, stagger: 0.06 },
        '-=3'
      )
      .to(split.words, {
        autoAlpha: 0,
        y: -40,
        stagger: 0.04,
        ease: 'power3.in',
      }, '-=1.5')
      .from('#logo', {
        y: 100,
        autoAlpha: 0,
      }, '-=0.25')
      .to('.hamburger', {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out',
      })

    /* ---------------------------------------------
       SIDEBAR + HAMBURGER TIMELINE
    --------------------------------------------- */

    // IMPORTANT: GSAP controls transforms — not Tailwind
    gsap.set('.menuItem', {
      xPercent: 100,
    })

    menuTl.current = gsap.timeline({ paused: true })

    menuTl.current
      // Hamburger → X
      .to(
        '#line-1',
        {
          rotation: 45,
          y: 8,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        '#line-2',
        {
          rotation: -45,
          y: -8,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      )

      // Sidebar slide
      .to(
        '.menuItem',
        {
          xPercent: 0,
          duration: 0.6,
          ease: 'power4.inOut',
        },
      )

    // CRITICAL: start reversed so first click opens menu
    menuTl.current.reverse()
  }, [])

  /* ---------------------------------------------
     TOGGLE HANDLER (BEST PRACTICE)
  --------------------------------------------- */
  const handleClick = contextSafe(() => {
    const isOpening = menuTl.current?.reversed();

    if (isOpening) {
      menuTl.current?.play();
      ScrollSmoother.get()?.paused(true);
      document.body.style.overflow = 'hidden';
    } else {
      menuTl.current?.reverse();
      ScrollSmoother.get()?.paused(false);
      document.body.style.overflow = 'auto';
    }
  })

  return (
    <div className="main relative h-[10vh] border-b-2 border-background w-full bg-foreground overflow-hidden">
      {/* INTRO TEXT */}
      <p className="intro-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-black">
        WELCOME
      </p>

      {/* NAVBAR CONTENT */}
      <div className="flex h-full w-full items-center justify-between px-[5%]">
        <Link
          href="/"
          className="relative h-16 w-24 cursor-pointer overflow-hidden"
        >
          <Image
            id="logo"
            src="/logo.svg"
            alt="logo"
            fill
            priority
            className="object-contain"
          />
        </Link>

        {/* HAMBURGER */}
        <div
          onClick={handleClick}
          className="hamburger flex cursor-pointer flex-col items-center justify-center gap-y-4"
        >
          <div
            id="line-1"
            className="h-0.5 w-10 sm:w-15 rounded-md bg-black"
          />
          <div id="line-2" className="h-0.5 w-10 sm:w-15 bg-black" />
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="menuItem fixed left-0 top-[10vh] z-50 h-[90vh] w-full bg-foreground">
        {/* menu content here */}
      </aside>
    </div>
  )
}

export default Navbar
