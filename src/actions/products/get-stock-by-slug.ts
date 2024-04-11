"use server"
import prisma from "@/lib/prisma"


export const getStockBySlug = async ( slug : string) => {
    try {

        const stock = await prisma.product.findFirst({
            where:{ slug: slug },
            select: { inStock:true }
        })

        if(!stock) return null

        return stock.inStock ?? 0 //Si no existe devuelve 0
        
    } catch (error) {
        throw new Error("Error-getStockBySlug, error al obtener el stock por slug");
    }
}