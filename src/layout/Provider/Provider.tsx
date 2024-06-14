"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { tokenState } from "@/recoil/atoms/authState";
import { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { RecoilRoot, useRecoilState } from "recoil";
interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <RecoilRoot>
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
