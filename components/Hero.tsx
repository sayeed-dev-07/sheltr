
'use client'
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ButtonBox from './Button';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText)

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





const Hero = ({ introCom }: { introCom: boolean }) => {
    const heroTl = useRef<GSAPTimeline | null>(null)

    const [index, setIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { contextSafe } = useGSAP(() => {
        const split = SplitText.create('.textSplit', {
            type: 'words, lines',
            mask: 'lines',
        })
        heroTl.current = gsap.timeline({ paused: true })

        heroTl.current.from(split.lines, {
            delay:0.3,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            autoAlpha: 0,
            y: 100,
        })
        const interval = setInterval(() => {
            setIndex((prev) => (prev === imgaes.length - 1 ? 0 : prev + 1))
        }, 10000)

        return () => {
            clearInterval(interval)
            split.revert()
        }

    }, { scope: containerRef })

    React.useEffect(() => {
        if (introCom) {
            heroTl.current?.play()
        }
    }, [introCom])

    return (
        <div ref={containerRef} className='lg:h-[90vh] after:content-[""] after:w-full after:h-full after:absolute after:inset-0 after:z-10 after:bg-black/40  border-b-2 border-background md:h-[75vh]  h-[50vh] sm:h-[60vh] flex  w-full bg-[skyblue] relative'>
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
                <div className='absolute left-[2%] sm:top-[40%] top-[14%] max-w-[500px] px-2 md:max-w-[700px] md:text-4xl text-2xl sm:text-3xl lg:text-5xl font-semibold text-start w-full'>
                    <p className='textSplit  font-nunito text-white'>
                        No reservation is required, so Anytime, any time
                        An image of life Spread out
                        Please come and play.
                    </p>
                </div>
                <div className='absolute h-14 w-40 sm:h-15 sm:w-50 right-[5%] bottom-[5%]'>
                    <ButtonBox color='white' text='Houses' />
                </div>
            </div>
        </div>
    );
};

export default Hero;