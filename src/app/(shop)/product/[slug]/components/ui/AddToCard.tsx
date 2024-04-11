"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { CartProduct, Product, Size } from "@/interfaces"
import { QuantitySelector, SizeSelector } from "@/components"
import { addProductToCart } from "@/store/features/cart/cartSlice";


interface Props {
  product: Product
}

const AddToCard = ({ product }:Props) => {

  const dispatch = useAppDispatch();

  const { sizes } = product
  const [size, setSize] = useState<Size | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const onAddToCard = () => {
    setPosted(true)
    if(!size) return

    const cartProdcut: CartProduct = {
      id: product.id,
      slug:product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      sizes: size,
      image: product.images[0]
    }
    dispatch(addProductToCart(cartProdcut))
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (

    <>
      {posted && !size && <span className="text-red-600 font-bold">Debe seleccionar una talla !</span>}

      {/* Selecctor de Tallas */}
      <SizeSelector selectedSize={size} availableSizes={sizes} onSizeSelector={setSize}/>

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantitySelector={setQuantity} />

      {/* Button agregar al carrito */}
      <button className="btn-primary my-5" onClick={onAddToCard}>Agregar al carrito</button>
    </>
  )
}

export default AddToCard