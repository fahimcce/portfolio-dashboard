"use client";

import { deleteBlog } from "@/services/BlogServices";
import { TBlog } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const router = useRouter();
  const { id, title, subtitle, photo, category, content } = blog;

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the blog "${title}"?`
      );
      if (!confirmed) return;
      await deleteBlog(id as string);
      window.location.reload();
      toast.success("Blog deleted successfully!");
    } catch {
      toast.error("Failed to delete the blog. Please try again.");
    }
  };

  return (
    <div className="bg-white h-[450px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={photo} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <h4 className="text-md text-gray-600 mb-2">{subtitle}</h4>

        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {category}
        </span>

        {/* <p className="text-gray-700 mt-2">{content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => router.push(`/dashboard/blogs/${id}`)}
            className="text-blue-600 hover:underline"
          >
            Read More
          </button>
        </div> */}
      </div>

      <div className="flex justify-between items-center mb-6 p-4">
        <button
          onClick={() => router.push(`/dashboard/blogs/${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
