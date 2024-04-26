import { MemberType } from "@prisma/client";

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.membership_type = user.membership_type
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.membership_type = token.membership_type
            }
            return session
        },
        authorized({auth,request}){
            const user = auth?.user
            const isOnDashboard = request.nextUrl?.pathname.startsWith("/dashboard")
            const isOnMerchPage = request.nextUrl?.pathname.startsWith("/merch")
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")

            //Only Admin
            if (isOnDashboard && user?.membership_type != MemberType.ADMIN) {
                return Response.redirect(new URL("/dashboard", request.nextUrl))
            }
            //Only Auth
            if (isOnMerchPage && !user) {
                return false;
            }
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        }
    }
}