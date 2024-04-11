import Image from "next/image"
import Link from "next/link"
import { initialData } from "@/seed/seed"
import { Title } from "@/components"
import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]


interface Props{
  params:{
    id:string
  }
}


const Order = ({ params }:Props) => {

  const { id } = params

  //TODO:verificar
  //redirecct(/)

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        
      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id}`}/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* CARRITO */}
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", 
                {
                  "bg-red-500": false,
                  "bg-green-700": true
                }
              )
            }>
              <IoCardOutline size={30} />
              {/* <span className="mx-3">Pendiente de pago</span> */}
              <span className="mx-3">Pagada</span>
            </div>


            {/* ITEMS DEL CARRITO */}
            <div className="flex flex-col gap-4">
              {
                productsInCart.map(product => (
                  <div key={product.slug} className="flex">
                    <Image 
                      src={`/products/${product.images[0]}`} 
                      alt={product.title} 
                      width={200} height={200} 
                      style={{ width:'200px', height:'200px'}}
                      className="mr-5 rounded" />
                    <div>
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                      <p className="font-bold">Subtotal: ${product.price * 3}</p>
                      <button className="underline mt-3">Remover</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* CHECKOUT - Resumen de orden*/}
          <div className="rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de emtrega</h2>
            <div className="mb-10">
              <p className="text-2xl">Maria Florencia Oldani</p>
              <p>Av. Siempre viva 123</p>
              <p>Barrio Alto Alberdi</p>
              <p>Cordoba, Córdoba</p>
              <p>CP. 5000</p>
              <p>+ 54 351 2457089</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>
              
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-2xl text-right">$ 100</span>

            </div>

            <div className="mt-5 mb-2 w-full">

              <div className={
                clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", 
                  {
                    "bg-red-500": false,
                    "bg-green-700": true
                  }
                )
              }>
                <IoCardOutline size={30} />
                {/* <span className="mx-3">Pendiente de pago</span> */}
                <span className="mx-3">Pagada</span>
              </div>

            </div>

          </div>

        </div>
        
      </div>

    </div>
  )
}

export default Order;