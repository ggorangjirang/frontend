import React from 'react'
import ProductCard from './ProductCard'

export default function ProductCardList() {
  return (
    <div className="w-[1240px] flex flex-wrap gap-x-20 gap-y-16 justify-center align-middle">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  )
}
