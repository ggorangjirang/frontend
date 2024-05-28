import { DefaultLayoutProps } from "@/components/common/type/LayoutType";
import React from "react";

export default function layout({ children }: DefaultLayoutProps) {
  return <div>{children}</div>;
}
