import { API_URLS } from "@/constants/apiUrlConfig";
import { postAxios, getEachAxios, patchAxios, getAxios } from "../axios";
import axios from "axios";

// 회원가입
export type Login = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  name: string;
};
export type PatchUser = {
  name: string | undefined;
  phoneNumber: string | undefined;
  currentPassword: string;
  newPassword?: string;
  confirmPassword?: string;
  address: {
    zipcode: string | undefined;
    streetAddress: string | undefined;
    detailAddress: string | undefined;
  };
};

export type JwtPayload = { email: string };

export type DuplicateResponse = {
  isDuplicate: any;
};

// 로그인
export const loginUser = async (data: Login): Promise<any> => {
  try {
    const response = await postAxios(`${API_URLS.users}/login`, data);

    return response;
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};
// 회원 가입
export const postUser = async (data: SignUp): Promise<SignUp> => {
  try {
    const response = await postAxios(`${API_URLS.users}/signup`, data);
    return response.data as SignUp;
  } catch (error) {
    console.error("Error posting User:", error);
    throw error;
  }
};

// 중복 확인
export const getDuplicate = async (email: string): Promise<DuplicateResponse> => {
  const response = await getAxios(`${API_URLS.users}/duplicate/${email}`);
  return response.data as DuplicateResponse;
};
// 회원 정보 수정

export const patchUser = async (data: PatchUser) => {
  try {
    const response = await patchAxios(`${API_URLS.users}/mypage`, data);
    return response.data as PatchUser;
  } catch (error) {
    console.error("Error updating User:", error);
  }
};

// 내 정보 조회
export const getUserInfoByEmail = async (token: string) => {
  try {
    const response = await getAxios(`${API_URLS.users}/mypage`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info by email:", error);
    throw error;
  }
};
