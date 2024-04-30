"use client"

import { MemberType, CollegeYear, ShirtSize } from "@prisma/client";
import styles from '@/app/ui/dashboard/users/addUser/addUser.module.css'
import { useFormState } from "react-dom"
import { useEffect } from "react";
import { addMember } from "@/app/lib/action";
import { useRouter } from "next/navigation";

const AddUserPage = () => {

    const [state, formAction] = useFormState(addMember, undefined)
    const router = useRouter()

    useEffect(() => {
        state?.success && router.push('/users/add')
    },[state?.success, router])

    return (
        <div className={styles.container}>
            <form action={formAction} className={styles.form}>
                <input type="text" placeholder='First Name' name='fname' required />
                <input type="text" placeholder='Last Name' name='lname' required />
                <input type="password" placeholder='Password' name='password' required />
                <input type="number" maxLength='10' minLength='8' placeholder='Student ID' name='studentID' required />
                <input type="email" placeholder='Email' name='email' required />
                <select name='membershipType'>
                    <option value="" disabled>Select Membership Type</option>
                    <option value={MemberType.GENERAL}>General Member</option>
                    <option value={MemberType.ALUMNI}>Alumni</option>
                    <option value={MemberType.ADMIN}>Admin</option>
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
                <select name="dueStatus">
                    <option value="" disabled>Paid Dues or Not</option>
                    <option value={false}>Unpaid</option>
                    <option value={true}>Paid</option>
                </select>
                <select name="shirtStatus">
                    <option value="" disabled>Paid Shirt or Not</option>
                    <option value={false}>Unpaid</option>
                    <option value={true}>Paid</option>
                </select>
                <input type="text" placeholder='Major' name='major' required />
                {state?.error}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddUserPage