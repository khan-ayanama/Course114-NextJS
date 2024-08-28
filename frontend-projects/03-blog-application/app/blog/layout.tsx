import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function page({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
