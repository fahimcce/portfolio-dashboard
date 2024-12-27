"use client";
import { deleteProject } from "@/services/ProjectServices";
import { ProductCardProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ProductCard = ({ project }: { project: ProductCardProps }) => {
  const router = useRouter();
  const { id, name, photo, category, description, github, live } = project;

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the project "${name}"?`
      );
      if (!confirmed) return;
      await deleteProject(id as string);
      window.location.reload();
    } catch {
      toast.error("Failed to delete the project. Please try again.");
    }
  };
  return (
    <div className="bg-white h-[450px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={photo} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>

        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {category}
        </span>

        <p className="text-gray-700 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>

          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Live Demo
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push(`/dashboard/projects/${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
