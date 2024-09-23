"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/utils/Icons";
import { kelvinToCelsius } from "@/utils/misc";
import moment from "moment";
import { Skeleton } from "./ui/skeleton";

// Define types for forecast data
interface Weather {
  main: string;
  description: string;
}

interface Forecast {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  timezone: number;
  name: string;
  weather: Weather[];
}

function Temperature() {
  const { forecast } = useGlobalContext();

  // State for time and day
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    if (!forecast || !forecast.timezone) return;

    // Update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(forecast.timezone / 60);
      // Custom format: 24-hour format
      const formattedTime = localMoment.format("HH:mm:ss");
      // Day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    // Clear interval
    return () => clearInterval(interval);
  }, [forecast]);

  // Check for loading state before destructuring
  if (!forecast || !forecast.weather) {
    return <Skeleton className="h-24 w-full" />;
  }

  // Destructure forecast data
  const { main, timezone, name, weather } = forecast as Forecast;

  // Calculate temperatures
  const temp = kelvinToCelsius(main.temp);
  const minTemp = kelvinToCelsius(main.temp_min);
  const maxTemp = kelvinToCelsius(main.temp_max);

  // Destructure weather data
  const { main: weatherMain, description } = weather[0];

  // Function to get the correct icon based on weather condition
  const getIcon = () => {
    if (!weatherMain) return null;

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
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1 items-center">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div className="flex items-center gap-2">
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
