"use client";
import useWebSocket from "@/hooks/useWebSocket";
import { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  const data = useWebSocket(1, "");

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
