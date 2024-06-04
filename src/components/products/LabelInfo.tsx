type Props = {
  text: string;
};

export default function LabelInfo({ text }: Props) {
  return <div className="w-[100px] text-[18px] font-bold text-text">{text}</div>;
}
