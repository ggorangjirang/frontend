import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  flexColumn?: boolean;
}

export default function PageWrapper({ children, flexColumn }: Props) {
  return (
    <div
      className={`flex h-full w-[1240px] flex-wrap justify-center gap-x-20 align-middle ${flexColumn ? "flex-col" : "flex-row"}`}
    >
      {children}
    </div>
  );
}
