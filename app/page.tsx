/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/refs */
'use client'

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Magazine from "@/components/Magazine";
import Navbar from "@/components/Navbar";
import PickUp from "@/components/PickUp";
import SectionBlog from "@/components/SectionBlog";
import Zoom from "@/components/zoom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";


gsap.registerPlugin(ScrollSmoother, ScrollTrigger)


export default function Home() {
  const [introCom, setIntroCom] = useState(false)
  const smotherRef = useRef<ScrollSmoother | null>(null)
  const { contextSafe } = useGSAP(() => {

    smotherRef.current = ScrollSmoother.create({
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: false,
    })
    const showAnim = gsap.from('.navbar-fixed', {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1); // Start in the "shown" state

    // Trigger animation based on scroll direction
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() < 100) {
          showAnim.play(); // Always show at the very top of the page
        } else {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      }
    });
  })

  const handleClick = contextSafe((name: string) => {
    smotherRef.current?.scrollTo(name, true, 'top top')
  })

  return (
    <div id="smooth-wrapper" className="bg-foreground h-auto">
      <nav className="navbar-fixed fixed top-0 left-0 w-full z-50">
        <Navbar setIntroCom={setIntroCom}/>
      </nav>
      <div id="smooth-content">
        <div className="pt-[10vh]">
          <Hero introCom={introCom}/>
        </div>
        <PickUp/>
        <Zoom />
        <Magazine/>
        <SectionBlog/>
        <Footer/>
      </div>


    </div>
  );
}
