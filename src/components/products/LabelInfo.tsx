import React from "react";
import { DefaultLayoutProps } from "../common/type/LayoutType";

type Props = {
  text: string;
};

export default function LabelInfo({ text }: Props) {
  return <div className="text-[18px] text-text font-bold w-[100px]">{text}</div>;
}
