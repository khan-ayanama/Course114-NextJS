import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-5 md:px-12 lg:px-28">
      <Link href={"/"}>
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          className="w-[130px] sm:w-auto"
        />
      </Link>
      <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000] hover:bg-gray-100 transition-all ease-in-out duration-200">
        Get started <Image src={assets.arrow} alt="arrow" />
      </button>
    </nav>
  );
}
