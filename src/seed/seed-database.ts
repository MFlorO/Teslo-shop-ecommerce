import { initialData } from "./seed";
import prisma from '../lib/prisma'

async function main (){

    
    //* 1. Borrar regitros previos en las tablas
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
        

    const { categories, products, users } = initialData;


    //* 2. Categorías. 
    //* 2.1. Tomar las categorías y crear un objeto con el name:  

    const categoriesData = categories.map( category => ({ name: category }) )

    //* 2.. Crear la tabla de categorías:  
    await prisma.category.createMany({
        data: categoriesData
    })

    //* 3. Crear los productos:  

    //* 3.1. Igualar diferencias del seed con mi base de datos - por ejemplo el type:
    const categoriesDB = await prisma.category.findMany();
    // categoriesDB = [
    //     { id: '54645646545646', name: 'Shirt'},
    //     { id:'654654545645646' name:'Pants' }
    // ]


    const categoriesMap = categoriesDB.reduce( (map,category) => {

        map[(category.name.toLowerCase())] = category.id

        return map
        
    },  {} as Record<string,string> ) 

    //{} es el estado inicial que es un objeto vacio. 
    //Y as Record<string,string> el primer string es el label=shirt y el segundo string=categoryID
    // categoriesMap = {
    //      shirt: '54645646545646',
    //      pants: '654654545645646
    // }

    //* 3.2. Insertar los Productos:

    products.forEach ( async (product) => {

        const { images, type, ...rest } = product;
        const dbPRoduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        //images
        const imagesData = images.map( image => ({
            url: image,
            productId: dbPRoduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    
    //* 4. Usuarios
    //* 4.1. Insertar los Usuarios:
    
    await prisma.user.createMany({
        data: users
    });

    console.log('Seed ejecutado correctamente')
}


(() => {

    if (process.env.NODE_ENV === 'production') return
    main();

})(); 