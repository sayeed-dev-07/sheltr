import Image from 'next/image';
import React from 'react';

const FooterImg = ({ link, alt }: { link: string, alt: string }) => {
    return (
        <div className='w-full h-full relative '>
            <Image fill className='object-cover' src={link} alt={alt} />
        </div>
    );
};

export default FooterImg;