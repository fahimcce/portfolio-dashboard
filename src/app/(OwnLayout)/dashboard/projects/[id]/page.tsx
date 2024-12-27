"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { TupdateProduct } from "@/types";
import { getAllProjects, updateProject } from "@/services/ProjectServices";
import { uploadImageToCloudinary } from "@/utils/uploadToCloudinary";

export default function UpdateProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setproject] = useState<TupdateProduct | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects: TupdateProduct[] = await getAllProjects();
        const currentProject = projects.find((cat) => cat.id === projectId);

        if (currentProject) {
          setproject(currentProject);
        } else {
          toast.error("Project not found");
        }
      } catch {
        toast.error("Failed to fetch Project details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File | null; // Explicitly handle null
    let photo = project?.photo;
    if (imageFile && imageFile.size > 0) {
      photo = await uploadImageToCloudinary(imageFile);
    }
    const payload: Partial<TupdateProduct> = {
      name: formData.get("name") as string,
      photo,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      github: formData.get("github") as string,
      live: formData.get("live") as string,
    };

    try {
      await updateProject(projectId, payload);
      toast.success("Category updated successfully!");
      router.push("/dashboard/projects");
      setLoading(false);
    } catch {
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Update Project: {project?.name}
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Project Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={project?.name}
            className="w-full input input-bordered"
            placeholder="Enter Category name"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Category
          </label>
          <input
            name="category"
            type="text"
            defaultValue={project?.category}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Github Link
          </label>
          <input
            name="github"
            type="text"
            defaultValue={project?.github}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Live Preview Link
          </label>
          <input
            name="live"
            type="text"
            defaultValue={project?.live}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Project Description
          </label>
          <input
            name="description"
            type="text"
            defaultValue={project?.description}
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Project Landing Page Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full input input-bordered"
          />
          {project?.photo && (
            <div className="mt-2">
              <Image
                src={project.photo}
                alt={project.name || "Project Image"}
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
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
