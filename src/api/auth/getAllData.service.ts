import { axiosInstance } from "@/lib/axios";
import { formatLocalDate } from "@/lib/date";
import type { GetAllDataResponse } from "@/types/type";

const getAllDataEndpoint = "/BannerAds/Package/List";

export const getAllDataService = async (): Promise<
  GetAllDataResponse["data"]
> => {
  try {
    const response =
      await axiosInstance.get<GetAllDataResponse>(getAllDataEndpoint);

    const items = response.data.data;

    return items.map((item) => ({
      ...item,
      created_at: formatLocalDate(item.created_at),
    }));
  } catch (error) {
    console.error("FETCH ERROR:", error);

    throw error;
  }
};
