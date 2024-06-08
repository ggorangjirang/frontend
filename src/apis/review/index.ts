import { API_URLS } from "@/constants/apiUrlConfig";
import { getAxios, postAxios } from "../axios";

// 리뷰 등록
export interface Review {
  title: string;
  content: string;
  profileImage?: File;
}

export const postReview = async (data: FormData): Promise<any> => {
  try {
    const response = await postAxios(`${API_URLS.users}/review`, data);
    return response;
  } catch (error) {
    console.error("Error posting Review:", error);
    throw error;
  }
};

export const getReview = async (): Promise<any> => {
  try {
    const response = await getAxios(`${API_URLS.users}/my-reviews`);
    return response;
  } catch (error) {
    console.error("Error getting Review:", error);
    throw error;
  }
};
