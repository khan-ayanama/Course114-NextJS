import connectMongo from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

// Handle GET requests: Fetch all blogs or a blog by ID
export async function GET(request: NextRequest) {
  await connectMongo();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Fetch a blog by ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    try {
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch blog" },
        { status: 500 }
      );
    }
  } else {
    // Fetch all blogs
    try {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch blogs" },
        { status: 500 }
      );
    }
  }
}

// Handle POST requests: Create a new blog
export async function POST(request: NextRequest) {
  await connectMongo();

  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image") as File;
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Ensure the path is handled correctly
    const imagePath = path.join(
      process.cwd(),
      "public",
      `${timestamp}_${image.name}`
    );
    await fs.promises.writeFile(imagePath, buffer); // Save the image file

    const blogData = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      category: formData.get("category")?.toString() || "",
      author: formData.get("author")?.toString() || "",
      authorImg: formData.get("authorImg")?.toString() || "",
      image: `/${timestamp}_${image.name}`, // Image path to store in DB
    };

    const newBlog = await BlogModel.create(blogData);
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 400 }
    );
  }
}

// Handle PUT requests: Update an existing blog
export async function PUT(request: NextRequest) {
  await connectMongo();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid blog ID" },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    const updateData: any = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      category: formData.get("category")?.toString() || "",
      author: formData.get("author")?.toString() || "",
      authorImg: formData.get("authorImg")?.toString() || "",
    };

    const image = formData.get("image") as File;
    if (image) {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const timestamp = Date.now();
      const imagePath = path.join(
        process.cwd(),
        "public",
        `${timestamp}_${image.name}`
      );
      await fs.promises.writeFile(imagePath, buffer); // Save the image file

      updateData.image = `/${timestamp}_${image.name}`; // Update image path
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests: Delete a blog
export async function DELETE(request: NextRequest) {
  await connectMongo();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid blog ID" },
      { status: 400 }
    );
  }

  try {
    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Remove the image file from the public directory if it exists
    const imagePath = path.join(process.cwd(), "public", blog.image);
    try {
      await fs.promises.unlink(imagePath);
    } catch (error) {
      console.warn("Image file not found or could not be deleted:", error);
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
