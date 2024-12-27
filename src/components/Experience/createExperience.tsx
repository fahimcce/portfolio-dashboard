"use client";

import { createExperience } from "@/services/ExperienceServices";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function CreateExperience() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleExperienceSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const experienceData = {
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
      await createExperience(experienceData);
      toast.success("Experience created successfully!");
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
          Create a New Experience
        </h1>
        <form
          ref={formRef}
          onSubmit={handleExperienceSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Job Title
            </label>
            <input
              name="title"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter job title"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block font-medium mb-1">
              Company Name
            </label>
            <input
              name="company"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block font-medium mb-1">
              Start Date
            </label>
            <input
              name="startDate"
              type="date"
              className="w-full input input-bordered"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-1">
              End Date
            </label>
            <input
              name="endDate"
              type="date"
              className="w-full input input-bordered"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full input input-bordered"
              rows={5}
              placeholder="Write a description of your experience"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400"
          >
            {loading ? "Creating..." : "Create Experience"}
          </button>
        </form>
      </div>
    </div>
  );
}
