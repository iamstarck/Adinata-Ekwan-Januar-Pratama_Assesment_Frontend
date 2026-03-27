import { axiosInstance } from "@/lib/axios";
import type { DataUniversalResponse } from "@/types/type";

const updateDataEndpoint = "/BannerAds/Package/Update";

export type updateDataPayload = {
  package_name: string;
  package_description: string;
  package_price: number;
  package_duration: number;
};

export const updateDataService = async (
  id: string,
  payload: updateDataPayload,
) => {
  try {
    const response = await axiosInstance.put<DataUniversalResponse>(
      `${updateDataEndpoint}/${id}`,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("UPDATE DATA ERROR:", error);

    throw error;
  }
};
