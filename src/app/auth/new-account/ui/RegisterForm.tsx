'use client'
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {

  const [errorActions, seterrorActions] = useState<null | { ok:boolean, message: string }>(null)

  const { register, handleSubmit, formState:{ errors } } = useForm<FormInputs>()

  const onSubmit = async(data:FormInputs) => {

    seterrorActions(null)
    const { name, email, password } = data;
    const response = await registerUser(name, email, password)

    if(!response.ok){
      seterrorActions(response)
      return;
    }

    const {user, ...rest } = response
    seterrorActions(rest)

    //* Aca quiere decir que salio todo bien. Se creo el usuario. Ahora tengo que autenticar.
    const resp = await login(email.toLowerCase(), password); 
    seterrorActions(resp)
    window.location.replace('/') //quiero forzar que recargue 
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

      {/* NOMBRE */}
      <label htmlFor="nombre completo">Nombre completo</label>
      <input 
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5" ,
            {
              'border-red-500': Object.keys(errors).length !== 0
            }
          )
        }
        autoFocus type="text" 
        {...register('name', { required: true })} 
      />

      {/* EMAIL */}
      <label htmlFor="email">Email</label>
      <input
      className={
        clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5" ,
          {
            'border-red-500': Object.keys(errors).length !== 0
          }
        )
      }
      type="email" 
      {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ })} 
      />


      {/* CONTRASEÑA */}
      <label htmlFor="contraseña">Contraseña</label>
      <input
      className={
        clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5" ,
          {
            'border-red-500': Object.keys(errors).length !== 0
          }
        )
      }
      type="password" 
      {...register('password', { required: true })}
      />

      { Object.keys(errors).length !== 0  && <span className="text-red-500 font-bold my-2">* Es obligatorio</span> }
      { errorActions !== null  && <span className={
        clsx(
          "font-bold my-2",
          {
            "text-red-500": !errorActions?.ok,
            "text-green-700": errorActions?.ok
          }
        )
      }>{ errorActions?.message }</span> }

      <button className="btn-primary">Ingresar</button>

      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="text-center underline">Ya tengo una cuenta</Link>

    </form>
  )
}

export default RegisterForm