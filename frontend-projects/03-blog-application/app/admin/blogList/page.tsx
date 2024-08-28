"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorImg: string;
  image: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        if (response.data.success) {
          setBlogs(response.data.data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/blogs?id=${id}`);
      if (response.data.success) {
        // Remove the deleted blog from the state
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog deleted successfully!");
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-semibold mb-6">Blog List</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col border-b border-gray-200 pb-4 mb-4"
          >
            <div className="flex items-start space-x-4">
              <Image
                src={blog.image}
                alt={blog.title}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-medium mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{blog.description}</p>
                <p className="text-sm text-gray-700 mb-2">
                  Category: {blog.category}
                </p>
                <div className="flex items-center space-x-4">
                  <Image
                    width={32}
                    height={32}
                    src={"/profile_icon.png"}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm text-gray-700">{blog.author}</p>
                </div>
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-sm text-white px-4 py-1 rounded-md bg-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <Link href={`/admin/editBlog/${blog._id}`}>
                    <button className="text-sm  bg-blue-500 px-4 py-1 rounded-md text-white hover:underline">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
