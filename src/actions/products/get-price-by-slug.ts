"use server"
import prisma from "@/lib/prisma"

export const getPriceByStock = async ( slug : string) => {
    try {

        const price = await prisma.product.findFirst({
            where:{ slug: slug },
            select: { price:true }
        })

        if(!price) return null

        return price.price ?? 0 //Si no existe devuelve 0
        
    } catch (error) {
        throw new Error("Error-getStockBySlug, error al obtener el stock por slug");
    }
}