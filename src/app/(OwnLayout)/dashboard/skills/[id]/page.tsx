"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getAllSkills, updateSkill } from "@/services/SkillServices";
import { TSkillUpdate } from "@/types";

export default function UpdateSkillPage() {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<TSkillUpdate | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();
  const skillId = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skills: TSkillUpdate[] = await getAllSkills();
        const currentSkill = skills.find((s) => s.id === skillId);

        if (currentSkill) {
          setSkill(currentSkill);
        } else {
          toast.error("Skill not found");
        }
      } catch {
        toast.error("Failed to fetch skill details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skillId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload: Partial<TSkillUpdate> = {
      name: formData.get("name") as string,
      level: formData.get("level") as string,
    };

    try {
      await updateSkill(skillId, payload);
      toast.success("Skill updated successfully!");
      router.push("/dashboard/skills");
      setLoading(false);
    } catch {
      toast.error("Failed to update skill. Please try again.");
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Update Skill: {skill?.name}</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white p-6 shadow rounded-md"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Skill Name
          </label>
          <input
            name="name"
            type="text"
            defaultValue={skill?.name}
            className="w-full input input-bordered"
            placeholder="Enter skill name"
          />
        </div>
        <div>
          <label htmlFor="level" className="block mb-2 font-medium">
            Skill Level
          </label>
          <input
            name="level"
            type="text"
            defaultValue={skill?.level}
            className="w-full input input-bordered"
            placeholder="Enter skill level (e.g., Beginner, Intermediate, Expert)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Skill"}
        </button>
      </form>
    </div>
  );
}
