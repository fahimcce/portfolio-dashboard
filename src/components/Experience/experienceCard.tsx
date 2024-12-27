"use client";

import { deleteExperience } from "@/services/ExperienceServices";
import { TExperience } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ExperienceCard = ({ experience }: { experience: TExperience }) => {
  const router = useRouter();
  const { id, title, company, startDate, endDate, description } = experience;

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the experience "${title}"?`
      );
      if (!confirmed) return;
      await deleteExperience(id as string);
      window.location.reload();
      toast.success("Experience deleted successfully!");
    } catch {
      toast.error("Failed to delete the experience. Please try again.");
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return null;
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate.toLocaleDateString();
  };

  return (
    <div className="bg-white h-auto rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-sm text-gray-500">
        {formatDate(startDate)} - {endDate ? formatDate(endDate) : "Present"}
      </p>
      <p className="text-gray-700 mt-2">{description}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => router.push(`/dashboard/experiences/${id}`)}
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

export default ExperienceCard;
