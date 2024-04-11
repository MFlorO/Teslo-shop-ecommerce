export const revalidate = 61000;

import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import { PriceLabel, ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { AddToCard } from "./components";


interface Props {
  params: {
    slug: string
  }
}



export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

  const slug = params.slug;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      images: [ `/products/${ product?.images[1] }`],
    },
  };
}



const  ProductPage = async ({ params }:Props) => {

    const { slug } = params;
    const product = await getProductBySlug(slug)

    if( !product ) notFound()


    return (
      <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
        {/* Slideshow */}

        <div className="col-span-1 md:col-span-2">
          <ProductSlideshow title={product.title} images={product.images} />
        </div>

        {/* Detalles */}
        <div className="col-span-1 px-5">

          <StockLabel slug={product.slug}/>

          <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>

          <PriceLabel slug={product.slug}/>

          <AddToCard product={product} />

          {/* Descripción */}
          <h3 className="font-bold text-sm">Descripción</h3>
          <p className="font-light">{product.description}</p>

        </div>

      </div>
    );
}


export default ProductPage