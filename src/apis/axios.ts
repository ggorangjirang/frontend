import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const commonAxios = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`HTTP ERROR: ${error.response?.status} - ${error.message}`);
      throw new Error(`HTTP ERROR: ${error.response?.status} - ${error.message}`);
    } else {
      const err = error as Error;
      console.error(err.message);
      throw error;
    }
  }
};

export const getAxios = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
  return commonAxios(url, {
    ...options,
    method: "GET",
  });
};
export const getEachAxios = (url: string, param: string, options: AxiosRequestConfig = {}): Promise<any> => {
  return commonAxios(url, {
    ...options,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    data: JSON.stringify(param),
  });
};
export const postAxios = (
  url: string,
  param: { [key: string]: any },
  options: AxiosRequestConfig = {}
): Promise<any> => {
  const token = window.localStorage.getItem("accessToken");
  return commonAxios(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
    data: JSON.stringify(param),
  });
};

export const postAxiosFile = (
  url: string,
  param: { [key: string]: any } | FormData, // FormData를 처리할 수 있도록 타입 추가
  options: AxiosRequestConfig = {}
): Promise<any> => {
  const isFormData = param instanceof FormData;

  const headers = isFormData
    ? { ...options.headers } // FormData일 경우 Content-Type을 자동 설정하므로 headers를 그대로 사용
    : {
        "Content-Type": "application/json", // 기본값
        ...options.headers,
      };
  const data = isFormData ? param : JSON.stringify(param);

  return commonAxios(url, {
    ...options,
    method: "POST",
    headers,
    data,
  });
};

export const patchAxios = (
  url: string,
  param: { [key: string]: any },
  options: AxiosRequestConfig = {}
): Promise<any> => {
  return commonAxios(url, {
    ...options,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    data: JSON.stringify(param),
  });
};
export const deleteAxios = (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
  return commonAxios(url, {
    ...options,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};
