/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

interface prop {
    divStyle: string,
    pStyle?: string,
    text: string,
    handleNavClick: (target:string) => void
   
}

const HandleHoverComp = ({  divStyle, pStyle, text , handleNavClick}: prop) => {
    const shadowRef = useRef<HTMLDivElement | null>(null)
    const timeLineRef = useRef<GSAPTimeline | null>(null)
    const { contextSafe } = useGSAP(() => {
        gsap.set(shadowRef.current!, {
            xPercent: -100,
        })
        timeLineRef.current = gsap.timeline({ paused: true })
        timeLineRef.current.to(shadowRef.current!, {
            xPercent: 0,
            duration: 0.3,
            ease: 'power3.out'
        })
    })
    const handleHoverIn = contextSafe(() => {
        timeLineRef.current?.timeScale(1).play();
    });

    const handleHoverOut = contextSafe(() => {
        timeLineRef.current?.timeScale(1.2).reverse();
    });
    const getId = (name:string)=>{
        if (name === 'Home' || name === 'TOP') {
            return '#hero'
        }else{
            return `#${name}`
        }
    }
    return (
        <div onClick={()=> handleNavClick(getId(text))} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} className={`${divStyle} group relative overflow-hidden cursor-pointer border-background`}>
            <div ref={shadowRef} className='absolute  w-full h-full bg-background inset-0 z-0'></div>
            <p className={`${pStyle} uppercase relative z-10 transition-all duration-150 text-background group-hover:text-white`}>
                {text}
            </p>
        </div>
    );
};

export default HandleHoverComp;