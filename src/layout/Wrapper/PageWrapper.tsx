import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
  }
  
export default function PageWrapper({children}:Props) {
  return (
    <div className="w-[1240px] flex flex-wrap gap-x-20 gap-y-16 justify-center align-middle">
        {children}
    </div>
  )
}
