import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "../services/api.service";
import { AuthError } from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                phone: {},
                password: {}
            },
            authorize: async (credentials) => {
                try {
                    const response = await login({ phone: credentials.phone, password: credentials.password })
                    if (response?.token != null) {
                        const user: User = {
                            isAdmin: true,
                            name: "Sang FESSSSSS",
                            phone: "0932430072",
                            email: "sang124@gmail.com",
                            access_token: response?.token
                        }
                        return user
                        // const profile = await getProfile(signin?.token)
                        // if (profile?.data != null) {
                        //     profile.data["access_token"] = signin?.token
                        //     return profile.data as User
                        // } else {
                        //     throw new CustomError("Access token không hợp lệ")
                        // }
                    } else {
                        throw new CustomError("Sai thông tin đăng nhập")
                    }
                } catch (error) {
                    throw new CustomError("Sai thông tin đăng nhập")
                }
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        maxAge: 24 * 60 * 60,
        strategy: 'jwt',
    },
    pages: {
        signIn: "/",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = (user as User)
            }
            return token
        },
        session({ session, token }) {
            (session.user as User) = token.user
            return session
        },
        authorized: async ({ auth }) => {
            return !auth
        },
    }
})

export class CustomError extends AuthError {
    static type: string
    static message: string

    constructor(message: any) {
        super()
        this.type = message
    }
}