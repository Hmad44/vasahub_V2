"use client"

import styles from "./loginForm.module.css"
import { useFormState } from "react-dom"
import { login } from '@/app/lib/action';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {

    const [state, formAction] = useFormState(login, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`)
    },[state?.success, router])

    return (
    <form action={formAction} className={styles.form}>
        <input type="email" placeholder='Email' name='email' required />
        <input type="password" placeholder='Password' name='password' required />
        <button type="submit">Login</button>
        {state?.error}
        <Link href="/register">{"Don't have an account?"} <b>Register</b></Link>
    </form>
    )
}

export default LoginForm