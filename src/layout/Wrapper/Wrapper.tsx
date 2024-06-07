"use client";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

//width 100vw, 100 vh margin 0 padding 0 bgcolor - lightblue

export default function Wrapper({ children }: Props) {
  return <div className="relative flex h-full flex-col items-center">{children}</div>;
}
