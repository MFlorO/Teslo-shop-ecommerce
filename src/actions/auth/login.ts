"use server"

import { signIn } from "@/auth.config"

export const authenticate = async ( prevState: string | undefined, formData: FormData) => {

    try {

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false, 
        })

        return 'Success'

    } catch (error) {

        if((error as any).type  === 'CredentialsSignin'){
            return 'CredentialsSignin'
        }

        return 'Other Error'
    }
}

export const login = async( email:string, password: string ) => {

    try {

        await signIn('credentials', { email, password })

        return {
            ok: true,
            message:'Iniciando sesión...'
        }
        
    } catch (error) {
        console.log('Error-Login: ', error)
        return{
            ok: false,
            message:'No se pudo iniciar sesión'
        }
    }

}