"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { assets } from "@/Assets/assets";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorImg: string;
  image: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [image, setImage] = useState<Blob | null>(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Ayan Khan",
    authorImg: "/author_img.png",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs?id=${params.id}`);
        if (response.data.success) {
          const blogData = response.data.data;
          setBlog(blogData);
          setData({
            title: blogData.title,
            description: blogData.description,
            category: blogData.category,
            author: blogData.author,
            authorImg: blogData.authorImg,
          });
        } else {
          toast.error("Failed to fetch blog details.");
        }
      } catch (error) {
        toast.error("Error fetching blog details.");
      }
    };

    fetchBlog();
  }, [params.id]);

  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`/api/blogs?id=${params.id}`, formData);

      if (response.data.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blogList"); // Redirect to blog list or any other page
      } else {
        toast.error("Error while updating blog");
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog.");
    }
  };

  if (!blog) {
    return <p>Loading...</p>; // Optional: Add a loading spinner or message
  }

  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={
              !image
                ? blog.image || assets.upload_area
                : URL.createObjectURL(image)
            }
            width={140}
            height={70}
            alt=""
            priority={true}
            style={{
              height: "120px",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          type="file"
          id="image"
          hidden
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog description</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="write content here"
          required
          rows={6}
        />
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          className="w-40 mt-4 px-4 py-3 border text-gray-700"
          onChange={onChangeHandler}
          value={data.category}
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white rounded-sm hover:bg-gray-900"
        >
          Update
        </button>
      </form>
    </>
  );
}
