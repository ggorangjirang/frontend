import React from 'react'
import { DefaultLayoutProps } from '../common/type/LayoutType'


export default function Tag({children}: DefaultLayoutProps) {
  return (
    <div className='text-gray border border-gray-border text-[12px] flex px-2 py-1 justify-center items-center'>{children}</div>
  )
}