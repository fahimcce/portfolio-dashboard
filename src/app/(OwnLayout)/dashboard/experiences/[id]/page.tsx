"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  getAllExperiences,
  updateExperience,
} from "@/services/ExperienceServices";
import { TExperienceUpdate } from "@/types";

export default function UpdateExperiencePage() {
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState<TExperienceUpdate | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const experienceId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experiences: TExperienceUpdate[] = await getAllExperiences();
        const currentExperience = experiences.find(
          (e) => e.id === experienceId
        );

        if (currentExperience) {
          // Parse startDate and endDate as Date objects if they are strings
          const parsedExperience = {
            ...currentExperience,
            startDate: currentExperience.startDate
              ? new Date(currentExperience.startDate)
              : undefined,
            endDate: currentExperience.endDate
              ? new Date(currentExperience.endDate)
              : undefined,
          };
          setExperience(parsedExperience);
        } else {
          toast.error("Experience not found");
        }
      } catch {
        toast.error("Failed to fetch experience details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [experienceId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload: Partial<TExperienceUpdate> = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      startDate: formData.get("startDate")
        ? new Date(formData.get("startDate") as string)
        : undefined,
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : undefined,
      description: formData.get("description") as string,
    };

    try {
      await updateExperience(experienceId, payload);
      toast.success("Experience updated successfully!");
      router.push("/dashboard/experiences");
      setLoading(false);
    } catch {
      toast.error("Failed to update experience. Please try again.");
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Update Experience: {experience?.title}
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Job Title
          </label>
          <input
            name="title"
            type="text"
            defaultValue={experience?.title}
            className="w-full input input-bordered"
            placeholder="Enter job title"
          />
        </div>
        <div>
          <label htmlFor="company" className="block mb-2 font-medium">
            Company Name
          </label>
          <input
            name="company"
            type="text"
            defaultValue={experience?.company}
            className="w-full input input-bordered"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-2 font-medium">
            Start Date
          </label>
          <input
            name="startDate"
            type="date"
            defaultValue={
              experience?.startDate
                ? experience.startDate.toISOString().split("T")[0]
                : ""
            }
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-2 font-medium">
            End Date
          </label>
          <input
            name="endDate"
            type="date"
            defaultValue={
              experience?.endDate
                ? experience.endDate.toISOString().split("T")[0]
                : ""
            }
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={experience?.description}
            className="w-full input input-bordered"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Experience"}
        </button>
      </form>
    </div>
  );
}
