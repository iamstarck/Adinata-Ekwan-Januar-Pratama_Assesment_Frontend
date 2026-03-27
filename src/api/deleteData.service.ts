import { axiosInstance } from "@/lib/axios";
import type { DataUniversalResponse } from "@/types/type";

const deleteDataEndpoint = "/BannerAds/Package/Delete";

export const deleteDataService = async (id: string) => {
  try {
    const response = await axiosInstance.delete<DataUniversalResponse>(
      `${deleteDataEndpoint}/${id}`,
    );

    return response.data;
  } catch (error) {
    console.error("DELETE DATA ERROR:", error);

    throw error;
  }
};
