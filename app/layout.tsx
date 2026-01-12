import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const noto = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sheltr",
  description: "A House Renting Site, Trusted By Thousands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${outfit.variable} ${noto.variable} ${geistMono.variable} bg-[#fcfbf5] font-noto antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
