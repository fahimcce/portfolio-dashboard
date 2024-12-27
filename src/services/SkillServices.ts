import axiosInstance from "@/lib/AxiosInstances";
import { TSkill, TSkillUpdate } from "@/types";

export const getAllSkills = async () => {
  try {
    const response = await axiosInstance.get(`/skills`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createSkill = async (payload: TSkill) => {
  try {
    const response = await axiosInstance.post(`/skills/create-skill`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create skill.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateSkill = async (id: string, payload: TSkillUpdate) => {
  try {
    const response = await axiosInstance.patch(`/skills/${id}`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update skill.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/skills/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete skill.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
