"use client";
import React from "react";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { useGlobalContext } from "@/context/globalContext";
import { kelvinToCelsius } from "@/lib/utils";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  // Ensure data is loaded before rendering
  if (!forecast || !fiveDayForecast) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { weather } = forecast;
  const { list } = fiveDayForecast;

  // Ensure weather and list are not null or undefined
  if (!weather || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Get today's date in the format used by the forecast data
  const today = moment().format("YYYY-MM-DD");

  // Filter the list for today's forecast
  const todaysForecast = list.filter((forecast: { dt_txt: string }) =>
    forecast.dt_txt.startsWith(today)
  );

  // Ensure weatherMain exists
  const { main: weatherMain } = weather[0] || {};

  // Get the appropriate icon based on weather condition
  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div
      className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-[3rem] line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => (
                    <CarouselItem
                      key={forecast.dt_txt}
                      className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                    >
                      <p className="text-gray-300">
                        {moment(forecast.dt_txt).format("HH:mm")}
                      </p>
                      <p>{getIcon()}</p>
                      <p className="mt-4">
                        {kelvinToCelsius(forecast.main.temp).toFixed(2)}°C
                      </p>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
