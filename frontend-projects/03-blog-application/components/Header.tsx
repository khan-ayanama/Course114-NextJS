"use client";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

export default function Header() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post("/api/email", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail(""); // Clear the input field on success
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <header className="py-5 px-5 md:px-12 lg:px-28">
      <Navbar />
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sequi
          quam ea quia qui maxime molestiae, eligendi accusantium dicta est
          delectus dolore voluptatum, quae, quasi animi praesentium eius amet
          dignissimos.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto border border-black shadow-[-7px_7px_0px_#000] mt-8"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="border-1 border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white font-bold border-l"
          >
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
}
