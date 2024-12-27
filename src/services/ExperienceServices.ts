import axiosInstance from "@/lib/AxiosInstances";
import { TExperience, TExperienceUpdate } from "@/types";

export const getAllExperiences = async () => {
  try {
    const response = await axiosInstance.get(`/experiences`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createExperience = async (payload: TExperience) => {
  try {
    const response = await axiosInstance.post(
      `/experiences/create-experience`,
      payload
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create experience.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateExperience = async (
  id: string,
  payload: TExperienceUpdate
) => {
  try {
    const response = await axiosInstance.patch(`/experiences/${id}`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update experience.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/experiences/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete experience.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
