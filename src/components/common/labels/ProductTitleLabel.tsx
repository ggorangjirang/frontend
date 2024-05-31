import React from "react";
import { DefaultLayoutProps } from "../type/LayoutType";

export default function ProductTitleLabel({ children }: DefaultLayoutProps) {
  return <div className="mb-7 mt-8 text-2xl font-bold text-text">{children}</div>;
}
