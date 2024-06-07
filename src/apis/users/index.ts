import { API_URLS } from "@/constants/apiUrlConfig";
import { postAxios } from "../axios";

// 회원가입
export interface SignUp {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

// 회원가입
export const postUser = async (data: SignUp): Promise<SignUp> => {
  try {
    const response = await postAxios(`${API_URLS.users}/signup`, data);
    return response.data as SignUp;
  } catch (error) {
    console.error("Error posting User:", error);
    throw error;
  }
};
