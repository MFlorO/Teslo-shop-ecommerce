'use client'
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { QuantitySelector } from ".."
import { useAppDispatch, useAppSelector } from "@/store"
import { removeProduct, updateProductQuantity } from "@/store/features/cart/cartSlice"


const ProductsInCartItems = () => {

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector( state => state.cart.cart);

  if(!productsInCart || productsInCart.length === 0) return redirect('/empty')

  return (
    <div className="flex flex-col gap-4">
    {
      productsInCart?.map(product => (
        <div key={`${product.slug}-${product.sizes}`} className="flex">
          <Image 
            src={`/products/${product.image}`} 
            alt={product.title} 
            width={200} height={200} 
            style={{ width:'200px', height:'200px'}}
            className="mr-5 rounded" />
          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
            {product.sizes} - <p>{product.title}</p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector quantity={product.quantity} onQuantitySelector={quantity => dispatch(updateProductQuantity({product, quantity}))} />
            <button className="underline mt-3" onClick={() => dispatch(removeProduct({product}))}>Remover</button>
          </div>
        </div>
      ))
    }
    </div>
  )
}

export default ProductsInCartItems