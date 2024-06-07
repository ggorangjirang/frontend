import { API_URLS } from "@/constants/apiUrlConfig";
import { postAxios } from "../axios";

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
    console.error("Error posting User:", error);
    throw error;
  }
};
