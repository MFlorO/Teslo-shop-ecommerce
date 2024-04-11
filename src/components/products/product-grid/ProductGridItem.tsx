"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/interfaces"

interface Props {
  product: Product
}

const ProductGridItem = ({ product }: Props) => {

  const { slug, title, images, price } = product

  const [displayImage, setDisplayImage] = useState(images[0])

  return (
    <div className="rounded-md overflow-hidden fade-in">

      <Image 
      src={`/products/${displayImage}`} 
      alt={title} 
      width={500} height={500}
      className="w-full object-cover rounded" 
      onMouseEnter={ () => setDisplayImage(images[1])}
      onMouseLeave={ () => setDisplayImage(images[0])}
      />

      <div className="p-4 flex flex-col">
        <Link href={`/product/${slug}`} className="hover:text-blue-600">{title}</Link>
        <span className="font-bold">${price}</span>
      </div>

    </div>
  )
}

export default ProductGridItem