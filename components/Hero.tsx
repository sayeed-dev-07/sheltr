
'use client'
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ButtonBox from './Button';



const imgaes = [
    { url: '/images/house-1.jpg', name: 'house-1' },
    { url: '/images/house-3.jpg', name: 'house-3' },
    { url: '/images/house-4.jpg', name: 'house-4' },
    { url: '/images/house-5.jpg', name: 'house-5' },
    { url: '/images/house-2.jpg', name: 'house-2' },
    { url: '/images/house-8.jpg', name: 'house-8' },
    { url: '/images/house-7.jpg', name: 'house-7' },
    { url: '/images/house-6.jpg', name: 'house-6' }
]





const Hero = () => {

    const [index, setIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {

        const interval = setInterval(() => {
            setIndex((prev) => (prev === imgaes.length - 1 ? 0 : prev + 1))
        }, 10000)

        return () => clearInterval(interval)

    }, [imgaes.length])
    return (
        <div ref={containerRef} className='lg:h-[90vh] after:content-[""] after:w-full after:h-full after:absolute after:inset-0 after:z-10 after:bg-black/20  border-b-2 border-background md:h-[75vh]  h-[50vh] sm:h-[60vh] flex  w-full bg-[skyblue] relative'>
            {
                imgaes.map((img: { url: string, name: string }, i) => {
                    return <div className={`${index === i ? 'z-2  opacity-100 ' : 'z-0 opacity-0'}  absolute inset-0 w-full  h-full transition-all duration-2000`} key={img.name}>
                        <div className='h-full w-full relative'>
                            <Image priority src={img.url} alt={`${img.name}`} loading='eager' fill className='object-cover grayscale-50'>

                            </Image>
                        </div>
                    </div>
                })
            }
            {/* Other contents */}
            <div className='w-full h-full relative z-15'>
                <div className='absolute h-14 w-40 sm:h-15 sm:w-50 right-[5%] bottom-[5%]'>
                    <ButtonBox color='white' text='Houses' />
                </div>
            </div>
        </div>
    );
};

export default Hero;