/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText)

const Navbar = () => {
    const splitRef = useRef<SplitText | null>(null)

    useGSAP(() => {
        const tl = gsap.timeline()
        splitRef.current = SplitText.create(['.link'], {
            type: "words",
            mask: "words",
            autoSplit: true,
        })

        tl.from('.main', {
            height: '100vh',
            ease: 'power4.in',
            duration: 1.5
        }).from(splitRef.current.words, {
            duration: 0.5,
            y: 100,
            autoAlpha: 0,
            stagger: 0.04,
        }, '+=25%').from('#img', {
            y: 100,
            autoAlpha: 0,
        }, '-=1')

        const links = gsap.utils.toArray<HTMLElement>('.link')
        const handlers: Array<{ element: HTMLElement; enter: () => void; leave: () => void }> = []
        links.forEach((link) => {
            const line = link.querySelector('.line')

            // ENTER: left → right
            gsap.set(line, {
                x: '100%'
            })
            link.addEventListener('mouseenter', () => {
                gsap.fromTo(
                    line,
                    {
                        x: '-100%',
                    },
                    {
                        x: '0%',
                        duration: 0.4,
                        ease: 'power2.out',
                    }
                )
            })

            // LEAVE: continue → right
            link.addEventListener('mouseleave', () => {
                gsap.fromTo(
                    line,
                    {
                        x: '0%',

                    },
                    {
                        x: '100%',
                        duration: 0.4,
                        ease: 'power2.in',
                    }
                )
            })

        })
        return () => {
            handlers.forEach(({ element, enter, leave }) => {
                element.removeEventListener('mouseenter', enter)
                element.removeEventListener('mouseleave', leave)
            })

            if (splitRef.current) {
                splitRef.current.revert()
            }

            tl.kill()
        }
    })

    return (
        <div className={`bg-[#fcfbf5] main w-full h-[10vh]`}>
            <div className={`flex items-center justify-between px-[5%] h-full w-full`}>
                <Link href={'/'} className='h-15 w-25 relative hover:scale-105 transition-all duration-150 cursor-pointer overflow-hidden'>
                    <Image
                        id='img'
                        loading="eager"
                        fill
                        className='object-contain'
                        alt='logo'
                        src='/logo.svg'
                    />
                </Link>
                <div className="hidden md:flex gap-x-6 text-2xl font-semibold text-background">
                    {['Culture', 'Houses', 'Residents', 'Contact', 'About'].map(
                        (item) => (
                            <Link key={item} href="/" className="link relative overflow-hidden">
                                {item}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current line" />
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;