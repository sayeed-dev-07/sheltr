'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger)

const TextAnimation = ({ text, style }: { text: string, style: string }) => {
    const textRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const split = SplitText.create(textRef.current, {
            type: "words, lines",
            mask: 'lines'
        });
        gsap.from(split.lines, {
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 70%',
                once: true
            },
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            autoAlpha: 0,
            y: 100
        })

        return () => {
            split.revert();
        };
    })

    return (
        <div ref={textRef} className={`${style}`}>
            {text}
        </div>
    );
};

export default TextAnimation;