import React from "react";

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => (
  <div className="flex justify-center">
    <span className="text-textbig font-bold text-warning">{text}</span>
  </div>
);

export default Message;
