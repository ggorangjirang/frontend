import { API_URLS } from "@/constants/apiUrlConfig";
import { postAxios } from "../axios";

type OrderItem = {
  productId: number;
  quantity: number;
};

export const postOrderItem = (data: OrderItem) => {
  const response = postAxios(`${API_URLS.orderItem}`, data);
  console.log(response);

  return response;
};
