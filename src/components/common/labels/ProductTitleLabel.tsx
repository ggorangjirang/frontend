import React from 'react'
import { DefaultLayoutProps } from '../type/LayoutType'


export default function ProductTitleLabel({children}: DefaultLayoutProps) {
  return (
    <div className='text-text text-2xl font-bold mb-7 mt-8'>{children}</div>
  )
}