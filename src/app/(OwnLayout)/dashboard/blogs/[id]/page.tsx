"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { getAllBlogs, updateBlog } from "@/services/BlogServices";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";
import { TBlogUpdate } from "@/types";

export default function UpdateBlogPage() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<TBlogUpdate | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs: TBlogUpdate[] = await getAllBlogs();
        const currentBlog = blogs.find((b) => b.id === blogId);

        if (currentBlog) {
          setBlog(currentBlog);
        } else {
          toast.error("Blog not found");
        }
      } catch {
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File | null;
    let photo = blog?.photo;
    if (imageFile && imageFile.size > 0) {
      photo = await uploadImageToCloudinary(imageFile);
    }
    const payload: Partial<TBlogUpdate> = {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      photo,
      category: formData.get("category") as string,
      content: formData.get("content") as string,
    };

    try {
      await updateBlog(blogId, payload);
      toast.success("Blog updated successfully!");
      router.push("/dashboard/blogs");
      setLoading(false);
    } catch {
      toast.error("Failed to update blog. Please try again.");
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Update Blog: {blog?.title}</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Blog Title
          </label>
          <input
            name="title"
            type="text"
            defaultValue={blog?.title}
            className="w-full input input-bordered"
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block mb-2 font-medium">
            Subtitle
          </label>
          <input
            name="subtitle"
            type="text"
            defaultValue={blog?.subtitle}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Category
          </label>
          <input
            name="category"
            type="text"
            defaultValue={blog?.category}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2 font-medium">
            Blog Content
          </label>
          <textarea
            name="content"
            defaultValue={blog?.content}
            className="w-full input input-bordered"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Blog Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full input input-bordered"
          />
          {blog?.photo && (
            <div className="mt-2">
              <Image
                src={blog.photo}
                alt={blog.title || "Blog Image"}
                height={100}
                width={100}
                className="w-80 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
