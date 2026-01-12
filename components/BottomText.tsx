/* eslint-disable react-hooks/refs */
'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ButtonBox = ({ color, text }: { color: string; text: string }) => {
    // 👇 Scope reference (CRITICAL)
   

    return (

        <div
            className="relative font-outfit w-32 h-15.5 group cursor-pointer"
        >
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* FILL — INSIDE BORDER */}
                <div className={`absolute  top-1.25 bottom-1.25 left-1.25 right-2.25 group-hover:opacity-100 opacity-0 transition-all duration-150 ${color === 'black' ? 'bg-background' : 'bg-foreground'} `} />

                {/* TOP BORDER */}
                <div
                    className="absolute top-0 left-0 w-full h-1.5 bg-repeat-x"
                    style={{
                        backgroundImage:
                            color === 'black'
                                ? "url('/images/top.png')"
                                : "url('/images/whtBtntop.png')",
                        backgroundSize: '200px 6px',
                    }}
                />

                {/* BOTTOM BORDER */}
                <div
                    className="absolute bottom-0 left-0 w-full h-1.5 bg-repeat-x"
                    style={{
                        backgroundImage:
                            color === 'black'
                                ? "url('/images/bottom.png')"
                                : "url('/images/whtBtnButtom.png')",
                        backgroundSize: '190px 6px',
                    }}
                />

                {/* LEFT BORDER */}
                <div
                    className="absolute top-2 left-0 w-1.5 h-[calc(100%-12px)] bg-repeat-y"
                    style={{
                        backgroundImage:
                            color === 'black'
                                ? "url('/images/left.png')"
                                : "url('/images/whtBtnLeft.png')",
                        backgroundSize: '6px 70px',
                    }}
                />

                {/* RIGHT BORDER */}
                <div
                    className="absolute top-1.5 right-1 w-1.5 h-[calc(100%-12px)] bg-repeat-y"
                    style={{
                        backgroundImage:
                            color === 'black'
                                ? "url('/images/right.png')"
                                : "url('/images/whtBtnRight.png')",
                        backgroundSize: '6px 70px',
                    }}
                />
            </div>

            {/* FOREGROUND */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <span className={`font-medium ${color === 'black' ? 'text-background group-hover:text-foreground' : 'text-foreground group-hover:text-background'} textHover duration-150 transition-all text-2xl `}>
                    {text}
                </span>
            </div>
        </div>

    )
}

export default ButtonBox
