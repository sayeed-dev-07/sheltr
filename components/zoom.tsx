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

    useGSAP(() => {
       
        const mm = gsap.matchMedia()
        mm.add('(min-width: 768px)', () => {
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

        })

    })

    return (
        <div ref={mainContainerRef} className='w-full md:h-screen h-[40vh] flex items-center  justify-center mt-[45%] md:mt-0'>
            <div ref={imgContainerRef} className='relative overflow-hidden md:h-[200px] md:w-[300px] w-full h-[60vh] '>
                <Image fill alt='scrollImg' className='object-cover ' src={'/images/finalzoom.jpg'} sizes="100vw" />
            </div>
        </div>
    );
};

export default Zoom;