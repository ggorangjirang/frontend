import React from "react";
import { DefaultLayoutProps } from "../type/LayoutType";

interface Props extends DefaultLayoutProps {
  bold?: boolean;
}

export default function TextBig({ bold = false, children }: Props) {
  return <div className={`text-[26px] text-text ${bold ? "font-bold" : ""}`}>{children}</div>;
}
