// app/blog/[id]/page.tsx
"use client";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

type BlogProps = {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  author: string;
  author_img: string;
};

export default function Blog({ params }: { params: { id: string } }) {
  const [data, setData] = useState<BlogProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs?id=${params.id}`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white text-black">
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4 mb-8">
          <Image
            src={"/profile_icon.png"}
            alt={data.author}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{data.author}</p>
            <p className="text-gray-500">
              {new Date(data.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Image
          src={data.image}
          alt={data.title}
          width={800}
          height={450}
          className="rounded-lg mb-8 object-cover w-full"
        />

        <p className="text-lg leading-relaxed mb-8">{data.description}</p>

        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-4">
          Starting a business is no easy task, and creating a roadmap for your
          startup is crucial. A roadmap will help you stay on track, set
          realistic goals, and measure your progress. Whether you are a
          first-time entrepreneur or a seasoned founder, having a clear plan can
          make all the difference in your journey.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Why is a Startup Roadmap Important?
        </h2>
        <p className="mb-4">
          A startup roadmap acts as a strategic guide for your business. It
          provides a visual timeline of your objectives and the milestones you
          need to hit to achieve them. This ensures that you’re always moving
          forward, even when faced with unexpected challenges.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          Steps to Create an Effective Roadmap
        </h2>
        <ol className="list-decimal list-inside mb-8">
          <li className="mb-2">Define your vision and mission.</li>
          <li className="mb-2">
            Identify key milestones and set realistic deadlines.
          </li>
          <li className="mb-2">
            Allocate resources and assign responsibilities.
          </li>
          <li className="mb-2">
            Monitor progress and be ready to pivot when necessary.
          </li>
          <li className="mb-2">Communicate your roadmap with stakeholders.</li>
        </ol>

        <p className="text-lg leading-relaxed mb-8">
          By following these steps, you’ll be well on your way to creating a
          startup roadmap that not only guides your efforts but also inspires
          confidence in your team and investors.
        </p>

        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <p className="mb-8">
          The journey of entrepreneurship is full of uncertainties, but with a
          well-crafted roadmap, you can navigate your way to success. Remember,
          a roadmap is not set in stone—it&apos;s a living document that should
          evolve as your startup grows. Stay focused, stay flexible, and most
          importantly, stay committed to your vision.
        </p>

        <div className="text-center mt-12">
          <p className="text-gray-500">Category: {data.category}</p>
        </div>
      </article>
    </div>
  );
}
