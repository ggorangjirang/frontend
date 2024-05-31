import React, { ReactNode } from "react";

type Props = {
  text: string;
  gray?: Boolean;
  style?: React.CSSProperties;
};

export default function TextMedium({ gray = false, text, style = {} }: Props) {
  return (
    <div className={`text-base ${gray ? "text-gray" : " text-text "}`} style={style}>
      {text}
    </div>
  );
}
