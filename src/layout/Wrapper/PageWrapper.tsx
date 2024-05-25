import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return <div className="flex w-[1240px] flex-wrap justify-center gap-x-20 align-middle">{children}</div>;
}
