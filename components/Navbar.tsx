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
        const split = SplitText.create('p', {
            type: 'chars, words',
            mask: 'words'
        })


        tl.from('.main', {
            height: '100vh',
            ease: 'power4.in',
            duration: 1.5
        }, '2')
            .fromTo(split.words, {
                autoAlpha: 0,
                y: 100
            }, {
                y: 0,
                autoAlpha: 1,
            }, '-=3')
            .to(
                split.words,
                {
                    autoAlpha: 0,
                    y: -40,
                    stagger: 0.03,
                    ease: 'power3.in',
                },
                '-=1' // happens just before/while navbar settles
            )
            .from(splitRef.current.words, {
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
            if (!links) {
                return
            }
            const line = link.querySelector('.line')

            // ENTER: left → right
            if (!line) {
                return
            }
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
        <div className={`bg-[#fcfbf5] main w-full h-[10vh] relative`}>
            <p className='absolute text-5xl text-black -translate-y-[50%] -translate-x-[50%] left-[50%] top-[50%] '>WELCOME</p>
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
                <div className='md:hidden link text-3xl text-black'>
                        ji
                </div>
            </div>
        </div>
    );
};

export default Navbar;