"use client"

import styles from "./registerForm.module.css"
import { useFormState } from "react-dom"
import { MemberType, CollegeYear, ShirtSize } from "@prisma/client";
import { register } from '@/app/lib/action';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {

    const [state, formAction] = useFormState(register, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push('/login')
    },[state?.success, router])

    return (
        <form action={formAction} className={styles.form}>
            <input type="text" placeholder='First Name' name='fname' required />
            <input type="text" placeholder='Last Name' name='lname' required />
            <input type="password" placeholder='Password' name='password' required />
            <input type="password" placeholder='Repeat Password' name='passwordRepeat' required />
            <input type="number" maxLength='10' minLength='8' placeholder='Student ID' name='studentID' required />
            <input type="email" placeholder='Email' name='email' required />
            <select name='membershipType'>
                <option value="" disabled>Select Membership Type</option>
                <option value={MemberType.GENERAL}>General Member</option>
                <option value={MemberType.ALUMNI}>Alumni</option>
            </select>
            <select name="collegeYear">
                <option value="" disabled>Select College Year</option>
                <option value={CollegeYear.FRESHMAN}>Freshman</option>
                <option value={CollegeYear.SOPHOMORE}>Sophomore</option>
                <option value={CollegeYear.JUNIOR}>Junior</option>
                <option value={CollegeYear.SENIOR}>Senior</option>
                <option value={CollegeYear.SUPERSENIOR}>Super Senior</option>
                <option value={CollegeYear.ALUMNI}>Alumni</option>
            </select>
            <select name="shirtSize">
                <option value="" disabled>Shirt Size</option>
                <option value={ShirtSize.XS}>XS</option>
                <option value={ShirtSize.S}>S</option>
                <option value={ShirtSize.M}>M</option>
                <option value={ShirtSize.L}>L</option>
                <option value={ShirtSize.XL}>XL</option>
            </select>
            <input type="text" placeholder='Major' name='major' required />
            <div className={styles.link}>
                <button type="submit">Register</button>
                {state?.error}
                <Link href="/login">Have an account? <b>Login</b></Link>
            </div>
        </form>
    )
}

export default RegisterForm