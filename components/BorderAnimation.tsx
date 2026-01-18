/* eslint-disable react-hooks/refs */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';


const BorderAnimation = ({ text }: { text: string }) => {
    const borderRef = useRef<HTMLDivElement | null>(null)
    const tl = useRef<GSAPTimeline | null>(null)
    const {contextSafe} = useGSAP(()=>{

        gsap.set(borderRef.current,{
            x: '-101%'

            
        })
        tl.current = gsap.timeline({paused:true})
        tl.current.to(borderRef.current,{
            x:'0%',
            duration:0.4,
            ease:'power1',
        })

    })
    const hover1 = contextSafe(()=>{
        tl.current?.play()
    })
    const hover2 = contextSafe(()=>{
        tl.current?.timeScale(1.4).reverse()
    })
    return (
        <div onMouseEnter={hover1} onMouseLeave={hover2} className='overflow-hidden cursor-pointer w-full h-full'>
            <p className=''>{text}</p>
            <div ref={borderRef} className='w-full h-0.5 bg-white'></div>
        </div>
    );
};

export default BorderAnimation;