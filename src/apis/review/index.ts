import { API_URLS } from "@/constants/apiUrlConfig";
import { deleteAxios, getAxios, patchAxios, postAxios } from "../axios";
import { Pageable, ProductDetail } from "../product";
import { AxiosResponse } from "axios";
import { OrderItemDetail } from "../orders";

// 리뷰 등록
export type postReviewRequest = {
  title: string;
  content: string;
  profileImage?: File;
};

export type getReviewResponse = {
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string | null;
  productId: number;
  productName: string;
  reviewId: number;
  updatedAt: string;
  userId: number;
};
export type ReviewableProduct = OrderItemDetail & {
  userId: number;
  productId: number;
};

export type getReviewableItemPageable = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ReviewableProduct[];
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

//리뷰 삭제
export const deleteReview = async (reviewId: number): Promise<any> => {
  try {
    let token = "";

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("accessToken") ?? "";
    }
    const response = await deleteAxios(`${API_URLS.users}/review/${reviewId}`, {
      headers: { Authorization: token },
    });
    return response;
  } catch (error) {
    console.error("Error posting Review:", error);
    throw error;
  }
};

//리뷰 쓰기
export const patchReview = async (reviewId: number, data: FormData): Promise<any> => {
  try {
    let token = "";

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("accessToken") ?? "";
    }
    const response = await patchAxios(`${API_URLS.users}/review/${reviewId}`, data, {
      headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error posting Review:", error);
    throw error;
  }
};

//리뷰 쓰기
export const postReview = async (data: FormData): Promise<any> => {
  try {
    let token = "";

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("accessToken") ?? "";
    }
    const response = await postAxios(`${API_URLS.users}/review`, data, {
      headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error posting Review:", error);
    throw error;
  }
};

//리뷰가져오기
export const getReview = async (page: number = 0, size: number = 5): Promise<any> => {
  try {
    let token = "";

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("accessToken") ?? "";
    }
    const response = await getAxios(`${API_URLS.users}/my-reviews??page=${page}&size=${size}`, {
      headers: { Authorization: token },
    });
    return response;
  } catch (error) {
    console.error("Error getting Review:", error);
    throw error;
  }
};

//쓰기 가능한 리뷰 가져오기
export const getReviewable = async (
  page: number = 0,
  size: number = 5
): Promise<AxiosResponse<getReviewableItemPageable>> => {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  try {
    const response = await getAxios(`${API_URLS.users}/reviewable-items?page=${page}&size=${size}`, {
      headers: { Authorization: token },
    });
    return response;
  } catch (error) {
    console.error("Error getting Review:", error);
    throw error;
  }
};
