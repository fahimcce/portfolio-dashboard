"use client";

import { createSkill } from "@/services/SkillServices";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function CreateSkill() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSkillSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const skillData = {
      name: formData.get("name") as string,
      level: formData.get("level") as string,
    };

    try {
      await createSkill(skillData);
      toast.success("Skill created successfully!");
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
          Create a New Skill
        </h1>
        <form ref={formRef} onSubmit={handleSkillSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Skill Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter skill name"
              required
            />
          </div>

          <div>
            <label htmlFor="level" className="block font-medium mb-1">
              Skill Level
            </label>
            <input
              name="level"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter skill level (e.g., Beginner, Intermediate, Expert)"
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
              "Create Skill"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
