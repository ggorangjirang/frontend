import { API_URLS } from "@/constants/apiUrlConfig";
import { deleteAxios, getAxios, postAxios } from "../axios";
import { AxiosResponse } from "axios";
import { Pagable } from "../product";

type CartItemRequest = {
  productId: number;
  quantity: number;
};

export type CartItem = {
  discountRate: number;
  id: number;
  price: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  discountedPrice: number;
  quantity: number;
};

type GetCartItemRequest = {
  page: number;
  size: number;
  sort: string[];
};

type getCartItemResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: CartItem[];
  number: number;
  pageable: Pagable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const postCartItems = (data: CartItemRequest): Promise<AxiosResponse<CartItem[]>> => {
  const response = postAxios(`${API_URLS.cartItem}`, data);

  return response;
};

export const getCartItems = async (
  data: GetCartItemRequest = { page: 0, size: 5, sort: ["asc"] }
): Promise<AxiosResponse<getCartItemResponse>> => {
  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = await getAxios(`${API_URLS.cartItem}?page=${data.page}&size=${data.size}&sort=asc`, {
    headers: { Authorization: token },
  });

  return response;
};

export const deleteCartItems = async (cartId: number) => {
  let token = "";
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = await deleteAxios(`${API_URLS.cartItem}/${cartId}`, {
    headers: { Authorization: token },
  });

  return response;
};
