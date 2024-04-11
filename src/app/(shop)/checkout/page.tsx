import Image from "next/image"
import Link from "next/link"
import { initialData } from "@/seed/seed"
import { Title } from "@/components"



const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]


const Checkout = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        
      <div className="flex flex-col w-[1000px]">

        <Title title="Verificar orden"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href='/cart' className="underline mb-5">Ediar carrito</Link>


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

              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en {`"Colocar orden"`}, aceptas nuestros <p className="underline">términos y condiciones y políticas de privacidad</p>
                </span>
              </p>

              <Link href='/orders/123' className="flex btn-primary justify-center">Colocar orden</Link>
            </div>

          </div>

        </div>
        
      </div>

    </div>
  )
}

export default Checkout