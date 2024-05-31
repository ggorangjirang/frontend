import React from "react";
import { DefaultLayoutProps } from "../common/type/LayoutType";

export default function Tag({ children }: DefaultLayoutProps) {
  return (
    <div className="flex items-center justify-center border border-gray-border px-2 py-1 text-[12px] text-gray">
      {children}
    </div>
  );
}
