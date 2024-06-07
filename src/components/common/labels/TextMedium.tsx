import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  gray?: Boolean;
  color?: boolean;
  style?: React.CSSProperties;
}

export default function TextMedium({ gray = false, children, color = false, style = {} }: Props) {
  return (
    <div className={`text-base  ${gray ? "text-gray" : color ? "text-secondary" : "text-text"} `} style={style}>
      {children}
    </div>
  );
}
