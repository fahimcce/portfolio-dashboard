import axiosInstance from "@/lib/AxiosInstances";

export const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload);

    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed.");
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An error occurred during login."
    );
  }
};
