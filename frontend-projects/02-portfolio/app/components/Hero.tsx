import MagicButton from "./ui/magic-Button";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function Hero() {
  return (
    <section className="relative">
      <div className="bg-black-100 h-screen  opacity-50 relative overflow-hidden z-10">
        <div className="">
          <Spotlight className="-top-40 left-10 w-[80vw]" fill="purple" />
          <Spotlight className="-top-20 left-5 w-[90vw]" fill="white" />
          <Spotlight className=" -left-10 -top-10 w-[90vw] " fill="purple" />
        </div>
        <div className=" absolute h-screen  w-full transform scale-x-[-1]">
          <Spotlight className="-top-40 left-10 w-[80vw]" fill="purple" />
          <Spotlight className="-top-20 left-5 w-[90vw]" fill="white" />
          <Spotlight className="w-[90vw] -top-8 -left-10" fill="purple" />
        </div>
      </div>
      <div className="h-screen w-full dark:bg-black bg-black-100 z-0 top-0 dark:bg-grid-white/[0.2] bg-grid-black/[0.2] absolute flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black-100 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="absolute px-2 w-full top-[20%] flex flex-col gap-4 justify-center items-center text-center z-30 ">
        <h2 className="uppercase tracking-wide leading-relaxed text-lg md:text-2xl">
          Dynamic Web Magic with Next.js
        </h2>
        <TextGenerateEffect
          duration={2}
          filter={false}
          words={"Transforming Concepts into Seamless User Experiences"}
        />
        <p className=" tracking-wide leading-relaxed text-lg md:text-2xl text-white">
          Hi! I’m Ayan, a Next.js Developer based in India.
        </p>
        <div className="mt-2">
          <MagicButton text="See my work" />
        </div>
      </div>
    </section>
  );
}
