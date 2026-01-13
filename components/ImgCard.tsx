'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

const ImgCard = ({ url, text }: { url: string, text: string }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const imgCoverRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLParagraphElement | null>(null)
    useGSAP(() => {
        const split = SplitText.create(textRef.current, { type: "words, lines", mask: 'lines' });
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 30%',
                once: true,
            }
        })
        
        tl.to(imgCoverRef.current,{
            yPercent:-100,
            
            ease:'power4.out',
            duration:1,
        })
        .from(split.lines, {
            y: 100,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            
        },'-=1');


        return () => {
            split.revert();
        };
    })
    return (
        <div ref={containerRef} className='flex items-center justify-center md:h-[110vh] flex-col px-4 gap-y-3'>
            <div className='max-w-112.5 relative overflow-hidden  w-full h-112.5'>
                <Image alt='pickupSideImg' src={`${url}`} fill />
                <div ref={imgCoverRef} className='w-full h-full absolute inset-0 bg-black'></div>
            </div>
            <div>
                <p ref={textRef} className='max-w-112.5 leading-tight
 w-full'>
                    {text}
                </p>
            </div>
        </div>
    );
};

export default ImgCard;