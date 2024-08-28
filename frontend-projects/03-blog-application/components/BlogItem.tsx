"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

type BlogItemProps = {
  image: string; // Use string for image URL
  category: string;
  title: string;
  description: string;
  id: string; // Update to string if using MongoDB ObjectId
};

export default function BlogItem({
  image,
  category,
  description,
  title,
  id,
}: BlogItemProps) {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border-black border transition-all ease-in-out duration-500 hover:shadow-[-8px_8px_0px_#000]">
      <Link href={`/blog/${id}`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="border border-black"
        />
      </Link>
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">
          {description}
        </p>
        <Link href={`/blog/${id}`}>
          <button className="inline-flex items-center py-2 font-semibold text-center gap-2">
            Read more <Image src={assets.arrow} alt="arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
}
