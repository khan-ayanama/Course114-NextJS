import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-3xl mt-1 text-yellow-300">
            <MdWbSunny className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
            <MdOutlineLocationOn className="text-3xl" />
          </h2>
        </p>
      </div>
    </nav>
  );
}
