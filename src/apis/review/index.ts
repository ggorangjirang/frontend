import { API_URLS } from "@/constants/apiUrlConfig";
import { getAxios, postAxios } from "../axios";

// 리뷰 등록
export interface Review {
  title: string;
  content: string;
  profileImage?: File;
}

export interface canReviewRequest {
  page: number;
  size: number;
}

export interface canReviewResponse {
  productId: number;
  userId: number;
  productName: string;
  imageUrl: string;
  orderPrice: number;
  quantity: number;
  totalPrice: number;
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

export const getReview = async (data: canReviewRequest = { page: 0, size: 5 }): Promise<any> => {
  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }
  const response = await getAxios(`${API_URLS.users}/my-reviews?page=${data.page}&size=${data.size}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

// 배송완료된 상품이면서 기존에 리뷰가 작성되지 않은 주문 아이템만 표시
export const canReview = async (data: canReviewRequest = { page: 0, size: 5 }): Promise<canReviewResponse> => {
  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }
  const response = await getAxios(`${API_URLS.users}/reviewable-items?page=${data.page}&size=${data.size}`, {
    headers: { Authorization: token },
  });
  return response.data as canReviewResponse;
};
