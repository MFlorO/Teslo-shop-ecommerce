export const revalidate = 60;

import { notFound, redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginationProductWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string
  },
  searchParams:{
    page?:string
  }
}


const GenderPage = async ({ params, searchParams }:Props) => {

  const { gender } = params 
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginationProductWithImages({page, gender: gender as Gender});

  const labels: Record<string,string>  = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Todos'
  }

  if(!products) return notFound()
  if(products?.length === 0) redirect(`/gender/${gender}`)

  return (
    <>
      <Title title={`Artículos de ${labels[gender]}`} subtitle="Todos los productos" className="mb-2"/>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </>
  );
}
  

export default GenderPage 