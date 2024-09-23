"use client";
import { GlobalContextProvider } from "@/context/globalContext";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <GlobalContextProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </GlobalContextProvider>
  );
}
