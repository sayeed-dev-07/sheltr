/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import HandleHoverComp from './handleHover'

gsap.registerPlugin(SplitText, ScrollSmoother)

const Navbar = () => {
  const topRef = useRef<HTMLDivElement | null>(null)
  const menuTl = useRef<GSAPTimeline | null>(null)
  const topTl = useRef<GSAPTimeline | null>(null)

  // 1. Sidebar hover animation logic
  useGSAP(() => {
    if (!topRef.current) return;

    gsap.set(topRef.current, { xPercent: -100 });

    topTl.current = gsap.timeline({ paused: true })
      .to(topRef.current!, {
        xPercent: 0,
        duration: 0.3,
        ease: 'power3.out'
      });
  })

  // 2. Main Intro and Menu Timeline Logic
  const { contextSafe } = useGSAP(() => {
    const introTl = gsap.timeline({
      onStart: () => {
        ScrollSmoother.get()?.paused(true);
        document.body.style.overflow = 'hidden';
      },
      onComplete: () => {
        ScrollSmoother.get()?.paused(false);
        document.body.style.overflow = 'auto';
      }
    })

    // Prepare the text split
    const split = SplitText.create('.intro-text', {
      type: 'words',
    })

    /* --- INITIAL STATES (Fixes the Flash) --- */
    // We set the containers to visible now that GSAP is ready to handle the children
    gsap.set('.intro-text', { opacity: 1 });
    gsap.set('.hamburger', { y: 30, autoAlpha: 0 });
    gsap.set('#logo', { y: 100, autoAlpha: 0 });

    /* --- ANIMATION SEQUENCE --- */
    introTl
      // A. Expand the navbar height
      .to('.main', {
        height: '10vh',
        duration: 1.5,
        ease: 'power4.inOut',
      }, 2)
      // B. Animate Welcome Text In
      .fromTo(
        split.words,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, stagger: 0.06 },
        '-=3'
      )
      // C. Animate Welcome Text Out
      .to(split.words, {
        autoAlpha: 0,
        y: -40,
        stagger: 0.04,
        ease: 'power3.in',
      }, '-=1.5')
      // D. Reveal Logo
      .to('#logo', {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.25')
      // E. Reveal Hamburger
      .to('.hamburger', {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out',
      }, "-=0.4")

    /* SIDEBAR + HAMBURGER TIMELINE */
    menuTl.current = gsap.timeline({ paused: true })
      .to('#line-1', { rotation: 45, y: 8, duration: 0.2, ease: 'power2.inOut' }, 0)
      .to('#line-2', { rotation: -45, y: -8, duration: 0.2, ease: 'power2.inOut' }, 0)
      .to('.menuItem', { x: 0, duration: 0.6, ease: 'power4.inOut' })

    menuTl.current.reverse()
  }, [])

  /* HANDLERS */
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
    <div className="main relative h-screen border-b border-background w-full bg-foreground overflow-hidden">
      <div className='h-full w-full'>
        {/* Added opacity-0 to prevent welcome flash */}
        <p className="intro-text opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full overflow-hidden text-6xl text-black">
          WELCOME
        </p>

        <div className="flex h-full w-full items-center justify-between px-[5%]">
          {/* Logo starts at opacity-0 */}
          <Link
            href="/"
            id="logo"
            className="relative h-16 w-24 cursor-pointer overflow-hidden opacity-0"
          >
            <Image
              src="/logo.svg"
              alt="logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* Hamburger starts at opacity-0 */}
          <div
            onClick={handleClick}
            className="hamburger opacity-0 flex cursor-pointer flex-col items-center justify-center gap-y-4"
          >
            <div id="line-1" className="h-0.5 w-10 sm:w-15 rounded-md bg-black" />
            <div id="line-2" className="h-0.5 w-10 sm:w-15 bg-black" />
          </div>
        </div>

        {/* Sidebar Overlay */}
        <aside className="menuItem translate-x-full fixed left-0 text-background font-outfit text-4xl top-[10vh] flex flex-col gap-y-5 z-50 h-[90vh] w-full bg-foreground">
          <div className='grid uppercase md:grid-cols-3 grid-cols-1 sm:grid-cols-2 h-[45vh] text-center border-background'>
            <HandleHoverComp divStyle='flex items-center justify-center border-b sm:border-r' text='Residents' />
            <HandleHoverComp divStyle='flex items-center justify-center border-b border-r-0 md:border-r' text='Culture' />
            <HandleHoverComp divStyle='flex items-center md:border-r-0 sm:border-r border-r-0 justify-center border-b ' text='Houses' />
            <HandleHoverComp divStyle='flex items-center justify-center border-b border-r-0 md:border-r' text='About' />
            <HandleHoverComp divStyle='flex items-center justify-center border-b sm:border-r' text='Blogs' />
            <HandleHoverComp divStyle='flex items-center justify-center border-b ' text='Contact' />
          </div>
          <div className='flex items-center justify-end px-4'>
            <HandleHoverComp divStyle='sm:px-6 px-3.5 border-2 w-fit text-xl sm:py-2.5 py-1.5' text='TOP'></HandleHoverComp>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Navbar