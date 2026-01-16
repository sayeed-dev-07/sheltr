'use client'
import Image from 'next/image';
import React, { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
const Zoom = () => {

  const mainContainerRef = useRef<HTMLDivElement | null>(null)
  const imgContainerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(() => {
    const split = SplitText.create(textRef.current, {
      type: "words, lines",
      mask: 'lines',
      autoSplit: true
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=300%',
      },
    })

    tl.to(imgContainerRef.current, {
      width: '100vw',
      height: '100vh',
      ease: 'none',
    })
      .from(split.lines, {
        autoAlpha: 0,
        y: 30,
        ease: 'power4.out'
      })
    return () => {
      split.revert();
    };

  }, { scope: mainContainerRef })

  return (
    <div ref={mainContainerRef} className='w-full  bg-[#507737] h-screen flex items-end justify-center mt-[45%] md:mt-0'>

      <div ref={imgContainerRef} className='relative after:content-[""] after:w-full after:h-full after:absolute after:inset-0 after:z-3 after:bg-black/30 overflow-hidden h-[40%] w-[50%]'>
        <Image fill alt='scrollImg' className='object-cover z-0' src={'/images/finalzoom.jpg'} sizes="100vw" />

        <p ref={textRef} className='absolute left-1/2 top-1/2 -translate-x-1/2 z-5  -translate-y-1/2 text-white w-full max-w-[900px] px-1.5 text-center text-3xl md:text-5xl'>More than 30 locations nationwide. A typical housing exhibition?
          No, it&apos;s only in a place reserved for SHELTR homes
          You can freely experience living in this or that. Please have fun.</p>

      </div>
    </div>
  );
};

export default Zoom;