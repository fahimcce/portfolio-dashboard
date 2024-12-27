"use client";

import { createBlog } from "@/services/BlogServices";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleBlogSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image") as File;
    const photo = await uploadImageToCloudinary(imageFile);
    const blogData = {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      photo,
      category: formData.get("category") as string,
      content: formData.get("content") as string,
    };
    try {
      await createBlog(blogData);
      toast.success("Blog created successfully!");
      formRef.current?.reset();
      setLoading(false);
    } catch (err: any) {
      toast.error("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create a New Blog
        </h1>
        <form
          ref={formRef}
          onSubmit={handleBlogSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Blog Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block font-medium mb-1">
              Subtitle
            </label>
            <input
              name="subtitle"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter blog subtitle"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <input
              name="category"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter blog category"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-medium mb-1">
              Content
            </label>
            <textarea
              name="content"
              className="w-full input input-bordered"
              placeholder="Write your blog content"
              rows={5}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Blog Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full input input-bordered"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Create Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
