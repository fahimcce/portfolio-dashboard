"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllProjects } from "@/services/ProjectServices";
import ProductCard from "./ProductCard";

export default function ProjectsFetch() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects();
        setProjects(fetchedProjects);
      } catch (err: any) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/dashboard/projects/add-project")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ADD Project
        </button>
      </div>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProductCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </div>
  );
}
