import { FaLocationArrow } from "react-icons/fa";

const MagicButton = ({ text }: { text: string }) => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-md font-medium text-white backdrop-blur-3xl gap-2">
        {text}
        <FaLocationArrow />
      </span>
    </button>
  );
};

export default MagicButton;
