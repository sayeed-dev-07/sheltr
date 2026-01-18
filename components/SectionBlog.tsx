'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Image from 'next/image';
import React from 'react';
import TextAnimation from './TextAnimation';
import ButtonBox from './Button';

gsap.registerPlugin(ScrollSmoother)

const SectionBlog = () => {


    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            smoothTouch: false,
        })


    })

    return (
        <div id='smooth-wrapper' className='bg-foreground min-h-[160vh]  py-[10%] md:py-[5%] sm:px-[5%] px-2 flex items-center justify-center'>
            <div id='smooth-content' className='text-background font-nunito w-full text-xl sm:text-2xl h-full md:text-3xl '>
                <div className='flex flex-col gap-y-24 lg:text-4xl max-w-[1200px] mx-auto'>
                    
                    <div className='w-full flex  items-center flex-col md:flex-row md:gap-3 gap-y-12 justify-between '>
                    <div data-speed='0.9' className='lg:w-[500px] w-full sm:w-[500px] '>
                        <TextAnimation style='text-center' text='More than 30 locations nationwide. A typical housing exhibition?
                            No, it&apos;s only in a place reserved for BESS homes
                            You can freely experience living in this or that. Please have fun.'/>
                    </div>
                    <div className="lg:w-[500px] w-full max-w-[400px] sm:w-[500px] sm:h-[500px] h-[400px] overflow-hidden relative">
                        <Image
                            data-speed="auto"
                            src="https://images.pexels.com/photos/27843675/pexels-photo-27843675.jpeg"
                            fill 
                            className="object-center scale-[1.5]"
                            alt="parallax image"
                        />
                    </div>

                </div>
                <div className='w-full flex items-center justify-between flex-col-reverse gap-y-12 md:flex-row md:gap-3'>

                    <div className="lg:w-125 w-full max-w-100 sm:h-[500px] h-[400px] sm:w-[500px]  overflow-hidden relative">
                        <Image 
                            data-speed="auto"
                            src="https://images.pexels.com/photos/32621498/pexels-photo-32621498.jpeg"
                            fill
                            className="object-center scale-[1.5]"
                            alt="parallax image"
                        />
                    </div>

                    <div data-speed='clamp(1.1)' className='lg:w-[500px] w-full sm:w-[500px] flex flex-col gap-y-5 items-center md:justify-end'>
                        <TextAnimation style='text-center' text='No reservation is required, so Anytime, any time
                            An image of life Spread out
                            Please come and play.'/>
                            <div className='w-[150px]  md:w-[250px] mb-[5%] h-[60px]'>
                                <ButtonBox color='black' text='See more'/>
                            </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SectionBlog;