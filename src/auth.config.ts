import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';



export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        
        if(!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data


        //* 1.Buscar el correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }});
        if(!user) return null;


        //* 2.Comparar las contraseñas
        if(!bcryptjs.compareSync( password, user.password)) return null;


        //* 3.Regresar el usuario
        const { password:_ , ...rest } = user;
        

        return rest
      },
    }),
  ]
}; 


export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);