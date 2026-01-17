/* eslint-disable react-hooks/refs */
'use client'
import { Quote } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
import TextAnimation from './TextAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface typeProp {
    img: string,
    quotes: string,
    subQuotes: string,
    num: number
}

const Quotes = ({ img, quotes, subQuotes, num }: typeProp) => {
    const imgRef = useRef(null)
    const timeLineRef = useRef<GSAPTimeline | null>(null)
    const { contextSafe } = useGSAP(() => {
        if (!imgRef.current) {
            return
        }
        timeLineRef.current = gsap.timeline({ paused: true })
        timeLineRef.current.to(imgRef.current, {
            scale: 1.07,
            duration: 0.9,
            ease: 'power1.in'
        })
    })
    const onEnter = () => {
        timeLineRef.current?.timeScale(1).play()
    }

    const onLeave = () => {
        timeLineRef.current?.timeScale(1.5).reverse()
    }

    return (
        <div className='text-background md:mt-12 mt-6 lg:mt-24 font-nunito w-full px-2 md:w-[90%] mx-auto '>
            <div className='flex items-center justify-between'>
                <div>
                    <Quote className='' size={48} />
                </div>
                <div className='leading-tight'>
                    <p className='uppercase font-semibold '>Quotes</p>
                    no <span className='lg:text-7xl md:text-6xl text-5xl xl:text-8xl'>{num}</span>
                </div>
            </div>
            <div className='line h-2.5 md:h-5 bg-background w-full my-6'></div>

            {/* quotes section */}
            <div className='flex flex-col gap-y-2 sm:gap-y-5 md:gap-y-8'>
                <TextAnimation text={quotes} style='lg:text-6xl font-semibold sm:font-normal md:text-5xl text-4xl xl:text-7xl' />
                <TextAnimation style='text-lg' text={subQuotes} />
            </div>
            <div className='line h-2.5 md:h-5 bg-background w-full my-12'></div>
            <div className='w-full h-[30vh] sm:h-[40vh] md:h-[30vh] lg:h-[45vh] xl:h-[80vh]'>
                <div onMouseEnter={onEnter} onMouseLeave={onLeave} className='relative overflow-hidden w-full h-full '>
                    <Image ref={imgRef} src={img} loading='lazy' fill alt='img' />
                </div>
            </div>
        </div>
    );
};

export default Quotes;