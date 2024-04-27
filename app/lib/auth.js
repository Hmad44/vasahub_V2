import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma"
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    try {
        const user = await prisma.$transaction([
            prisma.Member.findUnique({
                where: {
                    email: credentials.email
                },
            })
        ])

        if (!user) {
            throw new Error("Wrong credentials!")
        }

        const isPwCorrect = await bcrypt.compare(credentials.password, user[0].password)
        
        if (!isPwCorrect) {
            throw new Error("Wrong credentials!")
        }

        return user[0];

    } catch(err) {
        console.log(err)
        throw new Error("Failed to login in auth")
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user
                } catch(err) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        ...authConfig.callbacks
    }
})