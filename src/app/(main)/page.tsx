import React from "react";
import Header from "@/layout/Header";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="max-w-xl">
      <Header />
      <div>page</div>
    </div>
  );
}
