import { getAccessToken } from "@/utils/token";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, //10초
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  async function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error: AxiosError) {
    if (!error.response) {
      alert("네트워크 에러가 발생했습니다.");
      console.error("Network Error", error.message);
      if (typeof window !== undefined) window.history.back();
    } else if (error.code === "ECONNABORTED") {
      // Timeout error
      alert("요청시간이 초과하였습니다.");
      console.error("Timeout Error", error.message);
      if (typeof window !== undefined) window.history.back();
    } else if (error.response) {
      if (error.response.status === 401) {
        alert("로그인이 필요한 서비스입니다. 로그인해주세요");

        if (typeof window !== undefined) {
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("refreshToken");
          window.location.href = "/";
        }
      } else if (error.response.status === 403) {
        console.error("Forbidden", error.response.data);

        alert("권한이 없습니다.");

        if (typeof window !== undefined) window.history.back();
      } else {
        console.error(`클라이언트 에러 ${error.response.status}`, error.response.data);
      }

      if (error.response.status >= 500) {
        console.error(`server 에러입니다. ${error.response.status}`, error.response.data);
      }
    }
    return Promise.reject;
  }
);

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
      throw error as AxiosError;
    } else {
      const err = error as Error;
      console.error(err.message);
      throw error as AxiosError;
    }
  }
};

export const getAxios = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
  return commonAxios(url, {
    ...options,
    method: "GET",
  });
};
export const getEachAxios = async (
  url: string,
  params: { [key: string]: any },
  options: AxiosRequestConfig = {}
): Promise<any> => {
  console.log(params);
  return commonAxios(url, {
    ...options,
    method: "GET",
    params,
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
    data: param,
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
  const token = window.localStorage.getItem("accessToken");
  return commonAxios(url, {
    ...options,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
    data: param,
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
