import Wrapper from "@/layout/Wrapper";
import React, { ReactNode } from "react";



interface Props {
    children: ReactNode;
  }
  
export default function layout({ children }: Readonly<Props>) {
  return <Wrapper>{children}</Wrapper>;
}
