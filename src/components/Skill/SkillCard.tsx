"use client";

import { deleteSkill } from "@/services/SkillServices";
import { TSkill } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SkillCard = ({ skill }: { skill: TSkill }) => {
  const router = useRouter();
  const { id, name, level } = skill;

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the skill "${name}"?`
      );
      if (!confirmed) return;
      await deleteSkill(id as string);
      window.location.reload();
      toast.success("Skill deleted successfully!");
    } catch {
      toast.error("Failed to delete the skill. Please try again.");
    }
  };

  return (
    <div className="bg-white h-auto rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        {level}
      </span>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => router.push(`/dashboard/skills/${id}`)}
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

export default SkillCard;
