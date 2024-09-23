"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/globalContext";
import { wind } from "@/utils/Icons";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Wind() {
  const { forecast } = useGlobalContext();
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [windDir, setWindDir] = useState<number | null>(null);

  useEffect(() => {
    if (forecast?.wind) {
      setWindSpeed(forecast.wind.speed);
      setWindDir(forecast.wind.deg);
    }
  }, [forecast]);

  if (windSpeed === null || windDir === null) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
      flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <h2 className="flex items-center gap-2 font-medium">{wind} Wind</h2>

      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            className="h-auto w-auto"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert h-auto w-auto"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
          dark:text-white font-medium"
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}

export default Wind;
