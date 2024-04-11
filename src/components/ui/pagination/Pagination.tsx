'use client'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { generatePaginationNumbers } from "@/utils"
import clsx from "clsx"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
    totalPages: number
}

const Pagination = ({ totalPages }:Props) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page0 = searchParams.get('page') ?? 1
    const currentPage = isNaN(Number(page0)) ? 1 : Number(page0)

    const allPages = generatePaginationNumbers(currentPage,totalPages)

    const createPageUrl = (pageNumber: number | string) => { //string por los "..."

        const params = new URLSearchParams(searchParams)

        if(pageNumber === '...') return `${pathname}?${params.toString()}`
        if(+pageNumber <= 0) return `${pathname}` //uso el + para transformar el pageNumber en numero
        if(+pageNumber > totalPages) return `${pathname}?${params.toString()}`

        params.set('page',pageNumber.toString());
        return `${pathname}?${params.toString()}` 

    }

  return (
    <div className="flex justify-center text-center mt-10 mb-32">
        <ul className="flex list-style-none">
            <li className="page-item">
                <Link href={createPageUrl(currentPage - 1)}
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                ><IoChevronBackOutline size={30}/>
                </Link>
            </li>
            {
                allPages?.map( (page, index) => (
                    <li className="page-item" key={index}>
                        <Link 
                        href={createPageUrl(page)}
                        className={
                            clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    "bg-blue-600 text-white hover:text-blue-600" : page === currentPage
                                }
                            )
                        }
                        >{page}
                        </Link>
                    </li>
                ))
            }
            <li className="page-item">
                <Link href={createPageUrl(currentPage + 1)}
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                ><IoChevronForwardOutline size={30} />
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Pagination