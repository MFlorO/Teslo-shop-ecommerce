"use client"
import { useEffect, useState } from 'react'
import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'

interface Props {
   slug: string
}

const StockLabel = ({ slug }:Props) => {

  const [stock, setStock] = useState<null|number>(null)

  useEffect(() => {
    getStock()
  }, [])
  
  const getStock = async () => {
    const inStock =  await getStockBySlug(slug)
    setStock(inStock)
  }

  return (
    <>
      {
        stock === null 
        ? <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
        : <h5 className={`${titleFont.className} antialiased font-bold text-xl`}>Stock: {stock}</h5>
      }
    </>
  )
}

export default StockLabel