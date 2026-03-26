import { axiosInstance } from "@/lib/axios";
import type { LoginResponse } from "@/types/type";

const loginEndpoint = "/dashboard-user/LoginDashboard";

type LoginPayload = {
  username: string;
  password: string;
};

export const loginService = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      loginEndpoint,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("FETCH ERROR:", error);

    throw error;
  }
};
