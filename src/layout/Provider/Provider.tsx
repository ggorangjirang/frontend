"use client";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <RecoilRoot>
      <div>{children}</div>
    </RecoilRoot>
  );
}
