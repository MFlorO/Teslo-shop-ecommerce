"use client"
import { useEffect } from "react";
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store";
import { closeSideMenu } from "@/store/features";
import clsx from "clsx";
import { logout } from "@/actions";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"


const Sidebar = () => {

    const isSidebarMenuOpen = useAppSelector( state => state?.ui?.isSidebarMenuOpen);
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        logout()
        dispatch(closeSideMenu())
    }

    useEffect(() => {
        dispatch(closeSideMenu())
    }, [dispatch])
    

  return (
    <div>

        {/* FONDO NEGRO */}
        { isSidebarMenuOpen && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />}


        {/* BLUR */}
        { isSidebarMenuOpen && <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-md" onClick={ () => dispatch(closeSideMenu()) } /> }


        
        {/* SIDEBAR */}
        <nav className={
            clsx(
                "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                { "translate-x-full": !isSidebarMenuOpen }
            )
        }
        >


            {/* BOTON DE CIERRE */}
            <IoCloseOutline size={25} className="absolute top-5 right-5 cursor-pointer" onClick={ () => dispatch(closeSideMenu()) } />



            {/* INPUT */}
            <div className="relative mt-10">
                <IoSearchOutline size={20} className="absolute top-2 left-2"/>
                <input type='text' placeholder="Buscar" className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
            </div>

            {/* MENU */}
            <div className="w-screen flex flex-col mt-10 gap-4">

                <Link href='/profile' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all" onClick={ () => dispatch(closeSideMenu()) }>
                    <IoPersonOutline size={20} />
                    <span className="ml-3 text-l">Perfil</span>
                </Link>

                <Link href='/orders' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all" onClick={ () => dispatch(closeSideMenu()) }>
                    <IoTicketOutline size={20} />
                    <span className="ml-3 text-l">Ordenes</span>
                </Link>

                <Link href='/admin' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all" onClick={ () => dispatch(closeSideMenu()) }>
                    <IoLogInOutline size={20} />
                    <span className="ml-3 text-l">Ingresar</span>
                </Link>

                <Link href='/' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all" onClick={handleLogOut}>
                    <IoLogOutOutline size={20} />
                    <span className="ml-3 text-l">Salir</span>
                </Link>


                {/* SEPARADOR */}
                <div className="w-full h-px bg-gray-200 my-5" />

                <Link href='/products' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all">
                    <IoShirtOutline size={20} />
                    <span className="ml-3 text-l">Productos</span>
                </Link>

                <Link href='/orders' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all">
                    <IoTicketOutline size={20} />
                    <span className="ml-3 text-l">Ordenes</span>
                </Link>

                <Link href='/' className="flex items-center p-2 hover:bg-gray-100 rounded transition-all">
                    <IoPeopleOutline size={20} />
                    <span className="ml-3 text-l">Usuarios</span>
                </Link>

            </div>

        </nav>
        
    </div>
  )
}

export default Sidebar