export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            
        },
        async session({}) {

        },
        authorized({auth,request}){
            console.log(auth)
            return true
        }
    }
}