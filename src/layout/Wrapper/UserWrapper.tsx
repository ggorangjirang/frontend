import { ReactNode } from "react";
import Image from "next/image";
interface Props {
  children: ReactNode;
}

export default function UserWrapper({ children }: Props) {
  return (
    <div className="flex flex-col">
      <div className="relative mt-[100px] flex h-auto w-[468px] flex-col items-center">
        <Image src="/imgs/logos/logo3.png" width={259} height={81} alt={""} />
        {children}
      </div>
    </div>
  );
}
