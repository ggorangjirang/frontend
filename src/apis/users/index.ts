import { API_URLS } from "@/constants/apiUrlConfig";
import { getAxios, postAxios, getEachAxios, patchAxios } from "../axios";

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
export type PatchUser = SignUp & {
  phoneNumber: string;
  zipcode: string;
  streetAddress: string;
  detailAddress: string;
};

export type DuplicateResponse = { data: boolean };
// 로그인
export const loginUser = async (data: Login): Promise<Login> => {
  try {
    const response = await postAxios(`${API_URLS.users}/login`, data);
    console.log(response);
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
  try {
    const response = await getEachAxios(`${API_URLS.users}/duplicate`, email);
    return response.data;
  } catch (error) {
    console.error("Error getting User:", error);
    throw error;
  }
};
// 회원 정보 수정

const patchUser = async (userId: string, data: PatchUser) => {
  try {
    const response = await patchAxios(`/users/${userId}`, data);
    return response.data as PatchUser;
  } catch (error) {
    console.error("Error updating User:", error);
  }
};

// 회원 조회
// export const getUser = async (userId: string): Promise<PutUser> => {
//   try {
//     const response = await getAxios(`${API_URLS.users}/${userId}`);
//     return response.data as PutUser;
//   } catch (error) {
//     console.error("Error getting User:", error);
//     throw error;
//   }
// };
