'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import ButtonBox from './Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const Zoom = () => {

    const mainContainerRef = useRef<HTMLDivElement | null>(null)
    const imgContainerRef = useRef<HTMLDivElement | null>(null)


    useGSAP(()=>{
        gsap.set(imgContainerRef.current, {
            height: 200,
            width:300
        })
        gsap.to(imgContainerRef.current, {
            height:'100vh',
            width:'100vw',
            scrollTrigger:{
                trigger:mainContainerRef.current,
                pin:true,
                scrub:1,
                start: 'top top',
                end: '+=300%',
                
            }
            
        })
    })

    return (
        <div ref={mainContainerRef} className='w-full h-screen flex items-center  justify-center'>
            <div ref={imgContainerRef} className='relative overflow-hidden '>
                <Image fill  alt='scrollImg' className='object-cover ' src={'/images/finalzoom.jpg'} sizes="100vw" />
            </div>
        </div>
    );
};

export default Zoom;