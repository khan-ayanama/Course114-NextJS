"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { navItems } from "@/data";
export function FloatingNavDemo() {
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
