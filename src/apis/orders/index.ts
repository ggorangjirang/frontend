import { API_URLS } from "@/constants/apiUrlConfig";
import { deleteAxios, getAxios, postAxios } from "../axios";
import { AxiosResponse } from "axios";
import { Pageable } from "../product";
import { DELIVERY_STATUS } from "@/constants";

export type GetOrderResponse = {
  content: Order[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type GetOrderByIdPageableResponse = {
  id: number;
  orderDate: string;
  orderStatus: string;
  orderNumber: string;
  deliveryStatus: keyof typeof DELIVERY_STATUS;
  totalAllPrice: number;
  orderItems: {
    content: OrderItemDetail[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    pageable: Pageable;
  };
};

export type GetOrderByIdResponse = {
  id: number;
  orderDate: string;
  orderStatus: string;
  orderNumber: string;
  deliveryStatus: keyof typeof DELIVERY_STATUS;
  totalAllPrice: number;
  orderItems: {
    content: getOrderItemPageableResponse;
  };
};

export type getOrderPageableResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Order[];
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getOrderItemPageableResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: OrderItemDetail[];
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type OrderItemDetail = {
  quantity: number;
  orderPrice: number;
  productName: string;
  imageUrl: string;
  description: string;
  totalPrice: number;
};

type OrderItem = {
  productId: number;
  quantity: number;
};

export type Delivery = {
  name: string;
  phoneNumber: string;
  request: string;
  detailAddress: string;
  streetAddress: string;
  zipcode: string;
};
type PostOrderRequest = {
  delivery: Delivery;
  orderItems: OrderItem[];
};

export type Order = {
  id: number;
  orderDate: string;
  orderStatus: string;
  orderNumber: string;
  deliveryStatus: keyof typeof DELIVERY_STATUS;
  totalAllPrice: number;
  orderItems: OrderItemDetail[];
};

export const postOrders = (data: PostOrderRequest) => {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = postAxios(`${API_URLS.order}`, data, { headers: { Authorization: token } });
  return response;
};

export const getOrder = (page: number = 0, size: number = 5): Promise<AxiosResponse<getOrderPageableResponse>> => {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = getAxios(`${API_URLS.order}?page=${page}&size=${size}`, { headers: { Authorization: token } });
  return response;
};

export const getOrderById = (
  orderId: number,
  page: number = 0,
  size: number = 5
): Promise<AxiosResponse<GetOrderByIdResponse>> => {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = getAxios(`${API_URLS.order}/${orderId}?page=${page}&size=${size}`, {
    headers: { Authorization: token },
  });
  return response;
};

export const deleteOrderById = (orderId: number): Promise<AxiosResponse<GetOrderByIdResponse>> => {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("accessToken") ?? "";
  }

  const response = deleteAxios(`${API_URLS.order}/${orderId}`, {
    headers: { Authorization: token },
  });
  return response;
};
