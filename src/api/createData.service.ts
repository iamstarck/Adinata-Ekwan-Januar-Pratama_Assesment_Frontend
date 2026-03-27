import { axiosInstance } from "@/lib/axios";
import type { CreateDataResponse } from "@/types/type";

const createDataEndpoint = "/BannerAds/Package/Insert";

type createDataPayload = {
  package_name: string;
  package_description: string;
  package_price: number;
  package_duration: number;
};

export const createDataService = async (payload: createDataPayload) => {
  try {
    const response = await axiosInstance.post<CreateDataResponse>(
      createDataEndpoint,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("CREATE DATA ERROR:", error);

    throw error;
  }
};
