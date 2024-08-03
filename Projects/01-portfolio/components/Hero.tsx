import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { GridBackgroundDemo } from "./ui/BackgroundGrid";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";

export default function Hero() {
  return (
    <div className="text-center relative overflow-hidden">
      <GridBackgroundDemo />
      <div className="">
        <Spotlight className="-top-48 left-60" fill="#afc9fa" />
        <Spotlight className="-top-16 left-20" fill="#afc9fa" />
        <Spotlight className="top-20 -left-36" fill="#afc9fa" />
      </div>
      <div className="origin-center rotate-[100deg] -top-20 -right-96 w-full h-screen  absolute">
        <Spotlight className="top-20 right-96 " fill="#afc9fa" />
        <Spotlight className="-top-10 right-60 " fill="#afc9fa" />
        <Spotlight className="-top-40 right-28" fill="#afc9fa" />
      </div>
      <div className="absolute top-0 flex justify-center items-center  w-3/4 left-[50%] translate-x-[-50%]   h-screen text-white z-10 flex-col gap-4">
        <p className="uppercase font-light tracking-widest">
          Dynamic Web Magic w hith Next.js
        </p>
        <TextGenerateEffect
          className="relative text-center"
          words="Transforming Concepts into Seamless User Experience"
        />

        <p className="text-lg font-light">
          Hi! I&apos;m Ayan, a Next.js Developer based in India
        </p>
        <a href="#about">
          <MagicButton text="Show my work" />
        </a>
      </div>
    </div>
  );
}
