import { assets } from "@/Assets/assets";
import Sidebar from "@/components/AdminComponent/Sidebar";
import Image from "next/image";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex ">
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-black border-b">
            <h3 className="font-medium">Admin Panel</h3>
            <Image src={assets.profile_icon} alt="" width={40} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
