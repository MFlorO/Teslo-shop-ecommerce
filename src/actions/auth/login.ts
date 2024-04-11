"use server"

import { signIn } from "@/auth.config"

export const authenticate = async ( prevState: string | undefined, formData: FormData) => {

    try {
        
        // new Promise( resolve => {
        //     setTimeout(() => {
        //       resolve(true);
        //     }, 2 * 1000 );
        //   })

        await signIn('credentials', Object.fromEntries(formData))

    } catch (error) {

        console.log('error', error)

        if((error as Error).message.includes('CredentialsSignin')){
            return 'CredentialsSignin'
        }
    }
}