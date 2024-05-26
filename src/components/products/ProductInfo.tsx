import React from 'react'
import { DefaultLayoutProps } from '../common/type/LayoutType'


export default function ProductInfo({children}: DefaultLayoutProps) {
  return (
    <div className="flex flex-row gap-10 items-center">
{children}
  </div>
  )
}