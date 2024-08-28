"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [image, setImage] = useState<Blob | null>(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Ayan Khan",
    authorImg: "/author_img.png",
  });

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
      const response = await axios.post("/api/blogs", formData);

      if (response.data.success) {
        console.log("HERE", response);
        toast.success(response.statusText);

        // Reset the form
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Ayan Khan",
          authorImg: "/author_img.png",
        });
        setImage(null);
      } else {
        toast.error("Error while saving blog");
      }
    } catch (error) {
      toast.error("An error occurred while saving the blog.");
    }
  };

  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
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
          required
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
          Add
        </button>
      </form>
    </>
  );
}
