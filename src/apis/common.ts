import { RequestInit } from "next/dist/server/web/spec-extension/request";

const commonFetch = (url: string, options?: RequestInit): Promise<any> => {
  return fetch(``, {
    ...options,
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ERROR : the status is ${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

export const getFectch = (url: string, options?: RequestInit): Promise<any> => {
  return commonFetch(url, {
    ...options,
    headers: options?.headers,
  });
};

export const postFetch = (url: string, param: { [key: string]: any }, options?: RequestInit): Promise<any> => {
  return commonFetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(param),
  });
};

export const putFetch = (url: string, param: { [key: string]: any }, options?: RequestInit): Promise<any> => {
  return commonFetch(url, {
    ...options,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(param),
  });
};

export const deleteFetch = (url: string, options?: RequestInit): Promise<any> => {
  return commonFetch(url, {
    ...options,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
};
