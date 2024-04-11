"use client"
import { useEffect } from "react"
import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { useAppDispatch, useAppSelector } from "@/store"
import { openSideMenu } from "@/store/features"
import { getTotalItems } from "@/store/features/cart/cartSlice"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"


export const TopMenu = () => {

  const { totalItemsCart, cart } = useAppSelector( state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotalItems())
  }, [dispatch,cart])
  

  return (
    <div className="flex px-5 justify-between items-center w-full">

        {/* LOGO */}
        <div>
            <Link href='/'>
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                <span>| Shop</span>
            </Link>
        </div>

        {/* CENTER MENU */}
        <div className="hidden sm:block">
            <Link href='/gender/men' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Hombres</Link>
            <Link href='/gender/women' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Mujeres</Link>
            <Link href='/gender/kid' className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">Niños</Link>
        </div>

        {/* SEARCH CART */}
        <div className="flex items-center">
            <Link href='/search' className="mx-2"><IoSearchOutline className="w-5 h-5" /></Link>
            <Link href='/cart' className="mx-2">
                <div className="relative">
                    {totalItemsCart > 0 && <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">{totalItemsCart}</span>}
                    <IoCartOutline className="w-5 h-5" />
                </div>
            </Link>
            <button className="m-2 p-2 rounded-md translate-all hover:bg-gray-100 " onClick={() => dispatch(openSideMenu())}>Menú</button>
        </div>

    </div>
  )
}
