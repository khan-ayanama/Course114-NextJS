"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import BlogItem from "./BlogItem";

type BlogNavProp = {
  id: number;
  menu: Menu;
};

type Menu = "All" | "Technology" | "Startup" | "Lifestyle";

const BlogNav: BlogNavProp[] = [
  { id: 1, menu: "All" },
  { id: 2, menu: "Technology" },
  { id: 3, menu: "Startup" },
  { id: 4, menu: "Lifestyle" },
];

// Define the type for a blog item
type Blog = {
  _id: string;
  category: Menu;
  image: string;
  title: string;
  description: string;
};

export default function BlogList() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>("All");
  const [blogs, setBlogs] = useState<Blog[]>([]); // State to hold fetched blog data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Fetch blogs from the API when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs"); // Fetch all blogs from your API
        setBlogs(response.data.data); // Set the fetched blog data
        setLoading(false);
      } catch (err) {
        // Type guard for AxiosError
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blog data based on the selected menu
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedMenu === "All") return true; // Show all blogs when "All" is selected
    return blog.category === selectedMenu; // Show blogs that match the selected category
  });

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div className="flex justify-center gap-6 my-10">
        {BlogNav.map(({ id, menu }) => (
          <button
            key={id}
            onClick={() => setSelectedMenu(menu)}
            className={`py-1 px-4 rounded-sm ${
              selectedMenu === menu ? "bg-black text-white" : ""
            }`}
          >
            {menu}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {filteredBlogs.map((blog) => (
          <BlogItem
            key={blog._id}
            image={blog.image}
            category={blog.category}
            description={blog.description}
            title={blog.title}
            id={blog._id}
          />
        ))}
      </div>
    </section>
  );
}
