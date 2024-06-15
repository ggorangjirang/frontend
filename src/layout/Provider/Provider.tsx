"use client";

import { tokenState } from "@/recoil/atoms/authState";
import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        let token = null;
        if (typeof window !== "undefined") token = window.localStorage.getItem("accessToken");
        if (token) {
          set(tokenState, token);
        }
      }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>{children}</div>
    </RecoilRoot>
  );
}
