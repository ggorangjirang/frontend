import { API_URLS } from "@/constants/apiUrlConfig";
import { postAxios } from "../axios";

type DeliveryInfo = {
  name: string;
  phoneNumber: string;
  zipcode: string;
  detailAddress: string;
  request: string;
  streetAddress: string;
};

export const postDeliveries = (data: DeliveryInfo) => {
  const response = postAxios(`${API_URLS.delivery}`, data);
  return response;
};
