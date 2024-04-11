import Link from "next/link"
import { OrderSummary, ProductsInCartItems, Title } from "@/components"

const Cartpage = () => {

  return (
    <div className="flex justify-center items-center mb-72 px-8 sm:px-0">
      <div className="flex flex-col w-[1100px]">

        <Title title="Carrito"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href='/' className="underline mb-5">Continúa comprando</Link>

            {/* ITEMS DEL CARRITO */}
            <ProductsInCartItems />
          </div>

          {/* CHECKOUT - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            {/* ORDEN DE COMPRA */}
            <OrderSummary />
            <div className="mt-5 mb-2 w-full">
              <Link href='/checkout/address' className="flex btn-primary justify-center">Comprar</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cartpage