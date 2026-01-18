'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import ImgCard from './ImgCard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PickUp = () => {

    const contaierRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contaierRef.current,
                    pin: '.leftSide',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            })

        });
    })

    return (
        <div ref={contaierRef} className='px-2 flex w-full flex-col md:flex-row overflow-hidden'>
            <div className='leftSide md:w-[50%] w-full py-[10%] md:h-[100vh] flex items-center justify-center'>
                <div className='lg:w-112.5 md:w-87.5 sm:max-w-112.5 max-w-40 w-full relative h-15 md:h-50'>
                    <Image  fill loading='lazy' alt='pickupImg' src={'https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/themes/bess/assets/images/top_pickup_title.png'} />
                </div>
            </div>
            <div className="rightSide text-background flex flex-col gap-y-12.5 font-outfit sm:text-2xl text-lg w-full md:w-[50%]">
                <div className="md:h-[110vh] w-full card1">
                    <ImgCard
                        url="https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/uploads/2025/12/pickup_winterholiday.jpg?strip=all"
                        text="Wood-burning stove, log cabin, bonfire experience, etc
                        How to spend the best holidays
                        It's an event to find.
                        This weekend with my family
                        Experience extraordinary holidays Please!"
                    />
                </div>

                <div className="md:h-[110vh] w-full card2">
                    <ImgCard
                        url="https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/uploads/2025/10/pickup_40th_02-480x480.jpg?strip=all"
                        text='SHELTR House 40th Anniversary. The "SHELTR40 Festival" is currently being held at exhibition halls across the country!'
                    />
                </div>

                <div className="md:h-[110vh] w-full card3">
                    <ImgCard
                        url="https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/uploads/2025/03/pickup_request.webp?strip=all"
                        text={`For those who want to know more about the SHELTR house before visiting LOGWAY
                                SHELTR Guidebook "Why? We will deliver SHELTR.
                                Product catalogs and price lists can be found at LOGWAY
                                Please feel free to come and visit us.`}
                    />
                </div>

                <div className="md:h-[110vh] w-full card4">
                    <ImgCard
                        url="https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/uploads/2025/04/pickup_bnr_btob.jpg?strip=all"
                        text={`As a unique manufacturer with origins in log cabins, SHELTR has been exploring new markets.

                        Now, as part of our "special building business," we are taking great care in constructing corporate facilities such as stores, offices, and accommodation facilities.
                        No.1 in the country for log house share. ※`}
                    />
                </div>
            </div>

        </div>
    );
};

export default PickUp;