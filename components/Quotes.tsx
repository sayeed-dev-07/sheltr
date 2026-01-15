
import { Quote } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import TextAnimation from './TextAnimation';

interface typeProp{
    img: string,
    quotes: string,
    subQuotes: string,
    num: number
}

const Quotes = ({img, quotes, subQuotes, num}: typeProp) => {
    return (
        <div className='text-background md:mt-12 mt-6 lg:mt-24 font-nunito w-full px-2 md:w-[90%] mx-auto '>
            <div className='flex items-center justify-between'>
                <div>
                    <Quote className='' size={48} />
                    </div>                
                <div className='leading-tight'>
                    <p className='uppercase font-semibold '>Quotes</p>
                    no <span className='lg:text-7xl md:text-6xl text-5xl xl:text-8xl'>{num}</span>
                    </div>                
            </div>
            <div className='line h-2.5 md:h-5 bg-background w-full my-6'></div>

            {/* quotes section */}
            <div className='flex flex-col gap-y-2 sm:gap-y-5 md:gap-y-8'>
                <TextAnimation text={quotes} style='lg:text-6xl font-semibold sm:font-normal md:text-5xl text-4xl xl:text-7xl'/>
                <TextAnimation style='text-lg' text={subQuotes}/>
            </div>
            <div className='line h-2.5 md:h-5 bg-background w-full my-12'></div>
            <div className='w-full h-[30vh] sm:h-[40vh] md:h-[30vh] lg:h-[45vh] xl:h-[80vh]'>
                <div className='relative w-full h-full'>
                   <Image src={img} loading='lazy' fill alt='img'/>
                </div>
            </div>
        </div>
    );
};

export default Quotes;