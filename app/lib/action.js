"use server";

import prisma from '@/lib/prisma.js'
import bcrypt from 'bcrypt'
import { signIn, signOut } from "./auth";

export const handleLogout = async () => {
    "use server"
    await signOut()
}

export const register = async (previousState, formData) => {
    const { fname, lname, password, passwordRepeat, studentID, email, membershipType, collegeYear, shirtSize, major } = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)

    try {
        const emailCheck = await prisma.$transaction([
            prisma.Member.findUnique({
                where: {
                    email: email
                },
            })
        ])

        if (emailCheck[0]) {
            return {error: "Email already in use"}
        }

        const studentIDCheck = await prisma.$transaction([
            prisma.Member.findUnique({
                where: {
                    student_id: studentID
                },
            })  
        ])
        if (studentIDCheck[0]) {
            return {error: "Student ID already in use"}
        }
    } catch(err) {
        console.log(err)
        return {error: "Failed to access database"}
    }

    try {
        await prisma.$transaction([
            prisma.MemberProfile.create({
                data: {
                    Member: {
                        create: {
                            email: email,
                            password: hashedPwd,
                            student_id: studentID,
                            membership_type: membershipType
                        }
                    },
                    f_name: fname,
                    l_name: lname,
                    major: major,
                    college_year: collegeYear,
                    shirt_size: shirtSize,
                    due_status: false,
                }
            })
        ])
        return { success: true }
    } catch(err) {
        console.log(err)
        return {error: "Failed to register"}
    }
}

export const login = async (previousState, formData) => {
    const { email, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", {email, password})
    } catch(err) {
        console.log(err)
        if (err.message.includes("credentials")) {
            return {error: "Invalid username or password"}
        }
        throw err
    }
}