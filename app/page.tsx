/* eslint-disable react-hooks/refs */
'use client'
import BottomText from "@/components/BottomText";
import Navbar from "@/components/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";


gsap.registerPlugin(ScrollSmoother, ScrollTrigger)


export default function Home() {
  const smotherRef = useRef<ScrollSmoother | null>(null)
  const { contextSafe } = useGSAP(() => {
    smotherRef.current = ScrollSmoother.create({
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    })
  })

  const handleClick = contextSafe((name: string) => {
    smotherRef.current?.scrollTo(name, true, 'top top')
  })

  return (
    <div className="bg-foreground h-auto">
      <div id="smooth-content">
        <Navbar></Navbar>
        <div className="h-[200vh] bg-sky-400">
          
        </div>
      </div>
    </div>
  );
}
