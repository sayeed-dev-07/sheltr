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
        mm.add("(min-width: 800px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contaierRef.current,
                    pin: '.leftSide',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            })
            tl.addLabel('card-1')
                .from('.card1', {})
                .addLabel('card-2')
                .from('.card2', {})
                .addLabel('card-3')
                .to('.card3', {})
                .addLabel('card-4')
                .to('.card4', {})
                .addLabel('card-5')
                .to('.card5', {})
                .addLabel('end');

        });
    })

    return (
        <div ref={contaierRef} className='px-2 border-b-2 border-background flex w-full flex-col md:flex-row'>
            <div className='leftSide md:w-[50%] w-full py-[10%] md:h-[100vh] flex items-center justify-center'>
                <div className='lg:w-[450px] md:w-[350px] max-w-[450px] w-full relative h-[100px] md:h-[200px]'>
                    <Image fill loading='lazy' alt='pickupImg' src={'https://ecjp9e4f5fk.exactdn.com/wordpress/wp-content/themes/bess/assets/images/top_pickup_title.png'} />
                </div>
            </div>
            <div className="rightSide text-background flex flex-col gap-y-12.5 font-outfit sm:text-2xl text-lg w-full md:w-[50%]">
                <div className="md:h-[110vh] w-full card1">
                    <ImgCard
                        url="https://i.pinimg.com/1200x/fe/41/9b/fe419b82f02d3d256072b9d357a51d29.jpg"
                        text="If you never step forward because you’re afraid of losing, then nothing will ever change. Growth begins the moment you decide that standing still is more frightening than failure."
                    />
                </div>

                <div className="md:h-[110vh] w-full card2">
                    <ImgCard
                        url="https://i.pinimg.com/1200x/a1/52/c3/a152c390b1aaecac8f5171505bc4eb40.jpg"
                        text="Strength is not something you are born with. It is forged through doubt, mistakes, and the countless times you chose to stand back up when it would have been easier to stay down."
                    />
                </div>

                <div className="md:h-[110vh] w-full card3">
                    <ImgCard
                        url="https://i.pinimg.com/1200x/dc/d2/38/dcd238c94b84c7314120a4e0402274a7.jpg"
                        text="No matter how long the night lasts, the sky always finds a way to grow lighter. As long as you keep moving forward, even the darkest moments will eventually give way to dawn."
                    />
                </div>

                <div className="md:h-[110vh] w-full card4">
                    <ImgCard
                        url="https://i.pinimg.com/1200x/53/be/ac/53beac0544035b5df263d90f6f1eb93b.jpg"
                        text="You don’t have to carry everything alone. Trusting others does not make you weak—it proves that you understand how powerful shared belief and unity can truly be."
                    />
                </div>

                <div className="md:h-[110vh] w-full card5">
                    <ImgCard
                        url="https://i.pinimg.com/736x/d5/12/4a/d5124afaa6caf42e9475e6e284fe3fdd.jpg"
                        text="Pain, loss, and struggle are not meaningless. They shape who you become. The person who endures them and keeps moving forward is the one who truly changes the world."
                    />
                </div>

            </div>

        </div>
    );
};

export default PickUp;