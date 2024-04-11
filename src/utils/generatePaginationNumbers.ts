

export const generatePaginationNumbers = ( currentPage:number, totalPages:number ) => {

    //Si el numero de páginas es 7 o menos vamos a mostrar todas las paginas sin "..."
    if(totalPages <= 7) return Array.from({length:totalPages}, (_, i) => i + 1) 

    //Si la página actual esta entre las primeras 3 páginas. Mostrar las primeras 3,"...", y las últimas 2.
    if(currentPage <= 3) return [1,2,3,"...", totalPages - 1, totalPages]

    //Si la página actual esta entre las últimas 3 páginas. Mostrar las primeras 2,"...", y las últimas 3.
    if(currentPage >= (totalPages - 2)) return [1,2,"...", totalPages - 2, totalPages - 1, totalPages]

    //Si la página actual esta en otro lugar medio. Mostrar la primera página,"...", la pagina actual y vecinos, y la última página
    return [1,"...", currentPage-1, currentPage, currentPage+1,"...",totalPages]
}