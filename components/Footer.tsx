'use client'
import React, { useRef } from 'react'
import ColumnItems from './ColumnItems'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ButtonBox from './Button'
import Image from 'next/image'
import { FacebookIcon, GithubIcon } from 'lucide-react'
import Link from 'next/link'
import HoverAnimation from './HoverAnimation'
import BorderAnimation from './BorderAnimation'

const Footer = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 0px)", () => {
            const columns = containerRef.current?.querySelectorAll('.marquee-column');

            columns?.forEach((col, index) => {
                const htmlCol = col as HTMLElement;
                if (window.getComputedStyle(htmlCol).display === 'none') return;

                // GAP MATH ADJUSTMENT:
                // We detect the current gap. gap-4 is 16px, gap-8 is 32px.
                const currentGap = window.innerWidth < 768 ? 16 : 32;
                const loopDistance = (htmlCol.offsetHeight + currentGap) / 2;

                const isEven = index % 2 === 0;
                const columnDuration = isEven ? 70 : 50;

                gsap.set(htmlCol, { y: 0 });

                if (!isEven) {
                    gsap.set(htmlCol, { y: -loopDistance });
                }

                gsap.to(htmlCol, {
                    y: isEven ? `-=${loopDistance}` : `+=${loopDistance}`,
                    duration: columnDuration,
                    ease: 'none',
                    repeat: -1,
                    force3D: true,
                    modifiers: {
                        y: gsap.utils.unitize(gsap.utils.wrap(-loopDistance, 0))
                    }
                });
            });
        });

        return () => mm.revert();
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            // Mobile: 2 cols, gap-4 (16px) 
            // MD+: 3 cols+, gap-8 (32px)
            className="background h-screen overflow-hidden grid 
                       grid-cols-2 gap-4 
                       md:grid-cols-3 md:gap-8 
                       xl:grid-cols-4 
                       will-change-transform after:content-[''] after:w-full after:h-full after:absolute after:inset-0 after:z-10 after:bg-black/50"
        >

            {/* Column 1: Always Visible */}
            <div className="marquee-column flex flex-col gap-y-4 md:gap-y-8">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/1200x/b4/b0/a5/b4b0a5326dbbda940e513799c588a287.jpg' img2='https://i.pinimg.com/736x/c8/06/b2/c806b22606bd2b111992e2fa39d9558b.jpg' img3='https://i.pinimg.com/1200x/3c/f9/04/3cf904f31f151adbe21705d0d61e717d.jpg' img4='https://i.pinimg.com/736x/2a/df/60/2adf60bc65585c88cad208d5c7ac8a61.jpg' />
                </div>
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/1200x/b4/b0/a5/b4b0a5326dbbda940e513799c588a287.jpg' img2='https://i.pinimg.com/736x/c8/06/b2/c806b22606bd2b111992e2fa39d9558b.jpg' img3='https://i.pinimg.com/1200x/3c/f9/04/3cf904f31f151adbe21705d0d61e717d.jpg' img4='https://i.pinimg.com/736x/2a/df/60/2adf60bc65585c88cad208d5c7ac8a61.jpg' />
                </div>
            </div>

            {/* Column 2: Always Visible (for 2-col mobile) */}
            <div className="marquee-column flex flex-col gap-y-4 md:gap-y-8">
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/1200x/70/bc/67/70bc67f82e8e5987b8b6c9fd8f49a9b0.jpg' img2='https://i.pinimg.com/736x/78/02/f1/7802f18a55deca76a01856632b5a1f65.jpg' img3='https://i.pinimg.com/736x/4a/db/e5/4adbe578f0bd277c67a05a11ba26475e.jpg' img4='https://i.pinimg.com/1200x/d7/9a/79/d79a79d13e68368c869fac6f60fd64e6.jpg' />
                </div>
                <div className="flex flex-col gap-y-4 md:gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/1200x/70/bc/67/70bc67f82e8e5987b8b6c9fd8f49a9b0.jpg' img2='https://i.pinimg.com/736x/78/02/f1/7802f18a55deca76a01856632b5a1f65.jpg' img3='https://i.pinimg.com/736x/4a/db/e5/4adbe578f0bd277c67a05a11ba26475e.jpg' img4='https://i.pinimg.com/1200x/d7/9a/79/d79a79d13e68368c869fac6f60fd64e6.jpg' />
                </div>
            </div>

            {/* Column 3: Visible from MD */}
            <div className="marquee-column hidden md:flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/736x/54/33/5a/54335a857b537693d5c943381abc331b.jpg' img2='https://i.pinimg.com/1200x/79/c1/d8/79c1d8d3d7f4874bdcfa7219d0a78a41.jpg' img3='https://i.pinimg.com/736x/bd/0b/3a/bd0b3a2e91f7664a3985383d25ca622c.jpg' img4='https://i.pinimg.com/736x/6c/ab/b9/6cabb90fcde4e3d1073286d50ae82474.jpg' />
                </div>
                <div className="flex flex-col gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/736x/54/33/5a/54335a857b537693d5c943381abc331b.jpg' img2='https://i.pinimg.com/1200x/79/c1/d8/79c1d8d3d7f4874bdcfa7219d0a78a41.jpg' img3='https://i.pinimg.com/736x/bd/0b/3a/bd0b3a2e91f7664a3985383d25ca622c.jpg' img4='https://i.pinimg.com/736x/6c/ab/b9/6cabb90fcde4e3d1073286d50ae82474.jpg' />
                </div>
            </div>

            {/* Column 4: Visible from XL */}
            <div className="marquee-column hidden xl:flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/736x/51/47/b0/5147b083af3ead375424f5f4ed2e058b.jpg' img2='https://i.pinimg.com/736x/23/07/8f/23078f3ba43c83c757055b9d110b07cb.jpg' img3='https://i.pinimg.com/1200x/40/19/1c/40191cf1e2a58c7d8b749be598046443.jpg' img4='https://i.pinimg.com/1200x/0d/fc/2c/0dfc2c290c39de1b2e28c24a9686870f.jpg' />
                </div>
                <div className="flex flex-col gap-y-8">
                    <ColumnItems img1='https://i.pinimg.com/736x/51/47/b0/5147b083af3ead375424f5f4ed2e058b.jpg' img2='https://i.pinimg.com/736x/23/07/8f/23078f3ba43c83c757055b9d110b07cb.jpg' img3='https://i.pinimg.com/1200x/40/19/1c/40191cf1e2a58c7d8b749be598046443.jpg' img4='https://i.pinimg.com/1200x/0d/fc/2c/0dfc2c290c39de1b2e28c24a9686870f.jpg' />
                </div>
            </div>
            <div className='foreground flex items-center justify-between flex-col px-2 absolute text-white font-nunito h-full p-12 w-full inset-0 z-40'>
                <div className='md:max-w-[60vw] w-full gap-y-8 mx-auto flex flex-col items-center justify-center '>
                    <p className=' lg:text-5xl text-center text-4xl '>Reservation is now open</p>
                    <div className='sm:w-60 w-40 h-12 sm:h-15'>
                        <ButtonBox text='contact' color='white' />
                    </div>
                </div>
                <div className='text-center'>
                    <p className='md:text-6xl text-5xl lg:text-8xl'>SHELTER</p>
                    <div className='flex text-2xl cursor-pointer items-center justify-center gap-x-12 mt-12'>
                        <HoverAnimation text='Github' url='https://github.com/sayeed-dev-07' />
                        <HoverAnimation text='Instagram' url='https://www.instagram.com/sayeed_dev_07/' logo='instagram' />
                    </div>
                </div>
                <div className='flex w-full items-center justify-between flex-wrap gap-y-3 max-w-[80vw]'>
                    <div className='flex items-center justify-center flex-wrap gap-x-6'>
                        <a>
                            <BorderAnimation text='Privacy Policy'/>
                        </a>
                        <div>
                            <a href='https://www.facebook.com/sayeed.shorif.2025' target='_blank'>
                            <BorderAnimation text='&copy;sayedshorif'/>
                            </a>
                            
                        </div>
                    </div>
                    <a href='https://www.bess.jp/' target='_blank'>
                        <BorderAnimation text='inspired by BESS'/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer