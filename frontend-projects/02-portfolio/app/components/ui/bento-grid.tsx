"use client";
import { cn } from "@/app/lib/utils";
import { GlobeDemo } from "./globe-demo";
import MagicButton from "./magic-Button";
import { useState } from "react";
import Player from "react-lottie-player";
import successAnimation from "@/data/success.json"; //

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[15rem]  md:grid-cols-3 gap-4 max-w-7xl mx-auto auto-rows-[10rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  image,
  className,
  title,
  description,
  header,
  icon,
}: {
  id: number;
  image: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [copyEmail, setCopyEmail] = useState(false);

  const emailToCopy = "example@email.com";

  function handleCopyEmail() {
    navigator.clipboard
      .writeText(emailToCopy)
      .then(() => {
        setCopyEmail(true);
        setTimeout(() => setCopyEmail(false), 2000); // Hide the animation after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div
      className={cn(
        `rounded-xl overflow-hidden group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4   border-white  justify-between flex flex-col space-y-4 bg-center bg-cover bg-no-repeat text-lg leading-relaxed tracking-wide  bg-black-100 text-white border-2 ${
          id == 1 &&
          "row-start-1 row-span-2 justify-end  md:col-start-1 md:col-end-3"
        } ${id == 2 && "overflow-hidden md:col-start-3 md:col-end-5"} ${
          id == 3 && "overflow-hidden md:col-start-3 md:col-end-5"
        } ${
          id == 6 &&
          "md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-5 md:justify-start md:items-start md:h-full"
        } ${id == 4 && "md:col-start-1 md:col-end-2"} ${
          id == 5 && "md:col-start-1 md:col-end-2 relative"
        }`,
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      {header}
      <div
        className={`group-hover/bento:translate-x-2 transition duration-200 `}
      >
        <div>
          <div
            className="font-sans font-semibold
           text-2xl mb-2 mt-2"
          >
            {title}
          </div>
          <div className="font-sans font-normal  text-md ">{description}</div>
        </div>
        {id == 2 && <GlobeDemo />}
        {id == 3 && (
          <span
            className="flex justify-around *:inline-block *:bg-[#10132E] *:rounded-md overflow-hidden *:py-2 *:px-4 flex-wrap text-center md:*:w-32 content-around md:gap-2 md:mt-4 md:px-8
          "
          >
            <p>React</p>
            <p>Next.js</p>
            <p>Express</p>
            <p>Typescript</p>
          </span>
        )}

        {id == 5 && (
          <div className="justify-center flex md:justify-start">
            <MagicButton
              text={copyEmail ? "Email Copied!" : "Copy Email Address"}
              onClick={handleCopyEmail}
            />
          </div>
        )}
        {id == 6 && (
          <div className="justify-center flex md:justify-start">
            <MagicButton text="Visit Library" />
          </div>
        )}
      </div>

      {/* Lottie Animation Popup */}
      {copyEmail && (
        <div
          className="top-10 right-0 z-50 absolute bg-black-100 "
          aria-live="polite"
        >
          <div className=" p-4 rounded-lg shadow-lg transition-opacity duration-300">
            <Player
              play
              loop={false}
              animationData={successAnimation}
              style={{ height: "150px", width: "150px" }}
            />
            <p className="text-center mt-4">Email Copied!</p>
          </div>
        </div>
      )}
    </div>
  );
};
