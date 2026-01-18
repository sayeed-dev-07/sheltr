'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import Quotes from './Quotes';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const Images = [
    {
        url: 'https://images.pexels.com/photos/2339126/pexels-photo-2339126.jpeg',
        quotes: 'Not every step feels strong, but it still moves you forward',
        subQuotes: 'Progress isn’t always a sprint; sometimes it is simply the quiet courage to try again tomorrow.'
    },
    {
        url: 'https://images.pexels.com/photos/20881294/pexels-photo-20881294.jpeg',
        quotes: 'Love doesn’t always leave when people do.',
        subQuotes: 'It lingers in the habits we kept and the quiet spaces of our memory, long after the goodbye.'
    },
    {
        url: 'https://images.pexels.com/photos/9608580/pexels-photo-9608580.jpeg',
        quotes: 'You don’t need perfection — just persistence.',
        subQuotes: 'The most beautiful landscapes are built through years of erosion and slow, steady change.'
    },
    {
        url: 'https://images.pexels.com/photos/11215792/pexels-photo-11215792.jpeg',
        quotes: 'Knowledge grows when curiosity leads',
        subQuotes: 'A mind that never stops asking "why" will eventually discover "how" the world truly turns.'
    },
    {
        url: 'https://images.pexels.com/photos/16690495/pexels-photo-16690495.jpeg',
        quotes: 'Questions lead further than answers.',
        subQuotes: 'An answer is a destination that stops the journey, but a question is an open door to the infinite.'
    },
]

const Magazine = () => {
    const contaierRef = useRef<HTMLDivElement | null>(null)
    const leftContainer = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()
        mm.add('(min-width: 768px)', () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contaierRef.current,
                    pin: leftContainer.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            })
        })
    })

    return (
        <div ref={contaierRef} className='flex flex-col md:flex-row'>
            <div ref={leftContainer} className='h-screen  md:w-100 w-full bg-[#507737] flex items-center justify-center text-center flex-col md:border-r-15 border-black text-4xl gap-y-5 px-2'>
                <p className='text-white font-semibold font-nunito'>Where Thoughts Begin</p>
                <div className='max-w-[450px] w-full relative h-85 '>
                    <Image  alt='thorfinn' src={'/images/thorfinn.png'} fill />
                </div>
            </div>
            <div className='md:flex-1 w-full my-6 bg-foreground'>
                {
                    Images.map((item, index) => {
                        return <Quotes num={index + 1} key={index} img={item.url} quotes={item.quotes} subQuotes={item.subQuotes} />
                    })
                }
            </div>
        </div>
    );
};

export default Magazine;