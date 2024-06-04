interface Props {
  text: string;
  gray?: Boolean;
  color?: boolean;
  style?: React.CSSProperties;
}

export default function TextMedium({ gray = false, text, color = false, style = {} }: Props) {
  return (
    <div className={`text-base  ${gray ? "text-gray" : color ? "text-secondary" : "text-text"} `} style={style}>
      {text}
    </div>
  );
}
