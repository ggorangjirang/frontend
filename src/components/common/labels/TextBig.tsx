import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bold?: boolean;
}

export default function TextBig({ bold = false, children }: Props) {
  return <div className={`text-[26px] text-text ${bold ? "font-bold" : ""}`}>{children}</div>;
}
