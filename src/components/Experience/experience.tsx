"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllExperiences } from "@/services/ExperienceServices";
import ExperienceCard from "./experienceCard";

export default function ExperiencesFetch() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const fetchedExperiences = await getAllExperiences();
        setExperiences(fetchedExperiences);
      } catch (err: any) {
        setError("Failed to load experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading experiences...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/dashboard/experiences/add-experience")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ADD Experience
        </button>
      </div>
      {experiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No experiences found.</p>
      )}
    </div>
  );
}
