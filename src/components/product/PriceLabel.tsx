"use client"
import { useEffect, useState } from 'react'
import { getPriceByStock } from '@/actions'
import { titleFont } from '@/config/fonts'

interface Props {
   slug: string
}


const PriceLabel = ({ slug }:Props) => {

    const [price, setPrice] = useState<null|number>(null)

    useEffect(() => {
        getPrice()
    }, [])
    
    const getPrice= async () => {
      const inPrice =  await getPriceByStock(slug)
      setPrice(inPrice)
    }
  
    return (
      <>
        {
          price === null 
          ? <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
          : <p className="text-lg mb-5">$ {price}</p>
        }
      </>
    )
}

export default PriceLabel