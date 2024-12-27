import axiosInstance from "@/lib/AxiosInstances";
import { ProductCardProps, TupdateProduct } from "@/types";

export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get(`/project`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (payload: ProductCardProps) => {
  try {
    const response = await axiosInstance.post(
      `/project/create-project`,
      payload
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create product.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id: string, payload: TupdateProduct) => {
  try {
    const response = await axiosInstance.patch(`/project/${id}`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update product.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/project/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete product.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
