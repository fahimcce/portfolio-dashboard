import axiosInstance from "@/lib/AxiosInstances";
import { TBlog, TBlogUpdate } from "@/types";

export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/blogs`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (payload: TBlog) => {
  try {
    const response = await axiosInstance.post(`/blogs/create-blog`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create Blog.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id: string, payload: TBlogUpdate) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${id}`, payload);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update blogs.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete blogs.");
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
