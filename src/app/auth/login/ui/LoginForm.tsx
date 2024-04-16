"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/actions"
import clsx from "clsx"
import { IoInformationCircleOutline } from "react-icons/io5"


const LoginForm = () => {

  const router = useRouter()
  const { pending } = useFormStatus()
  const [state, dispatch] = useFormState(authenticate,undefined)


  useEffect(() => {
    if( state === 'Success'){
      router.replace('/')
    }
  }, [state])
  

  return (
    <form className="flex flex-col" action={dispatch}>

        <label htmlFor="email">Correo electrónico</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name='email'/>


        <label htmlFor="password">Contraseña</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" name='password'/>

        {/* ALERT DE ERROR */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === "CredentialsSignin" && (
            <div className="flex flex-row mb-2">
              <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Credenciales Incorrectas</p>
            </div>
          )}
        </div>

        <button className={
            clsx(
              pending ? "btn-disabled" : "btn-primary"
            )
        } type="submit" disabled={pending}>Ingresar</button>

        {/* divisor line */ }
        <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">Crear una nueva cuenta</Link>

    </form>
  )
}

export default LoginForm