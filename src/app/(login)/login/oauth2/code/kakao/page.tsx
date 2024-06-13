"use client";

import { Suspense } from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense>
      <div>page!</div>
    </Suspense>
  );
}
