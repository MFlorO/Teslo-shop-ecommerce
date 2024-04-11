"use client"
import { useEffect } from "react";
import { getSummaryInformation, getTotalItems } from "@/store/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/store";
import { currencyFormat } from "@/utils";


const OrderSummary = () => {

    const dispatch = useAppDispatch();
    const { subsTotal, tax, total } = useAppSelector(state => state.cart.summary)
    const totalItemsCart = useAppSelector(state => state.cart.totalItemsCart)
    
    useEffect(() => {
        dispatch(getSummaryInformation())
        dispatch(getTotalItems())
    }, [dispatch])
    

  return (
    <div className="grid grid-cols-2">
        <span>No. Productos</span>
        {
            totalItemsCart
            ? <span className="text-right">{currencyFormat(totalItemsCart)} artículos</span>
            : <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
        }
        
        <span>Subtotal</span>
        {
            subsTotal
            ? <span className="text-right">$ {currencyFormat(subsTotal)}</span>
            : <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
        }
        
        <span>Impuestos (15%)</span>
        {
            tax 
            ? <span className="text-right">$ {currencyFormat(tax)}</span>
            : <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
        }
        
        <span className="mt-5 text-2xl">Total: </span>
        {
            total
            ?<span className="mt-5 text-2xl text-right">$ {currencyFormat(total)}</span>
            : <div className={"bg-gray-200 animate-pulse w-24 h-5"}/>
        }
        
    </div>
  )
}

export default OrderSummary