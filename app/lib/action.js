"use server";

import prisma from '@/lib/prisma.js'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { signIn, signOut } from "./auth";

export const addMember = async (previousState, formData) => {
    const { fname, lname, password, studentID, email, membershipType, collegeYear, shirtSize, dueStatus, major } = Object.fromEntries(formData);
    
    if (studentID.length > 10 || studentID.length < 8) {
        return {error: "StudentID is incorrect"}
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)
    const due_status = (dueStatus == "true") ? true : false

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
                    due_status: due_status,
                }
            })
        ])
    } catch(err) {
        console.log(err)
        return {error: "Unknown error. User not created."}
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const deleteMember = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.MemberProfile.delete({
                where: {
                    id: id
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete member")
    }
    revalidatePath("/dashboard/users")
}

export const updateMember = async (formData) => {
    const { id, fname, lname, password, studentID, email, membership_type, college_year, shirt_size, due_status, major } = Object.fromEntries(formData);

    const salt = await bcrypt.genSalt(10)
    let hashedPwd = await bcrypt.hash(password, salt)
    
    if (password == "" || password == null) {
        hashedPwd = ""
    }

    let due_status_bool = (due_status === 'true')

    try {
        await prisma.$transaction([
            prisma.Member.update({
                where: {
                    id: id
                },
                data: {
                    profile: {
                        update: {
                            data: {
                                f_name: fname || undefined,
                                l_name: lname || undefined,
                                major: major || undefined,
                                college_year: college_year,
                                shirt_size: shirt_size,
                                due_status: due_status_bool,
                            }
                        }
                    },
                    email: email || undefined,
                    password: hashedPwd || undefined,
                    student_id: studentID || undefined,
                    membership_type: membership_type
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update member")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")  
}

export const addEvent = async (formData) => {
    const { title, location, date, description } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Event.create({
                data: {
                    title: title,
                    description: description,
                    location: location,
                    date: new Date(date),
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create event")
    }
    revalidatePath("/dashboard/events")
    redirect("/dashboard/events")
}

export const deleteEvent = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Event.delete({
                where: {
                    id: id
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete event")
    }
    revalidatePath("/dashboard/events")
}

export const updateEvent = async (formData) => {
    const { id, title, location, date, description } = Object.fromEntries(formData);
    
    try {
        await prisma.$transaction([
            prisma.Event.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    location: location || undefined,
                    date: new Date(date) || undefined,
                    description: description || undefined
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update event")
    }
    revalidatePath("/dashboard/events")
    redirect("/dashboard/events")  
}

export const addMerch = async (formData) => {
    const { title, cost, type, isAvailable, description } = Object.fromEntries(formData);
    let isAvailable_bool = (isAvailable === 'true')

    try {
        await prisma.$transaction([
            prisma.Merch.create({
                data: {
                    title: title,
                    costInCents: cost*100,
                    isAvailable: isAvailable_bool,
                    type: type,
                    description: description || undefined
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to create merch")
    }
    revalidatePath("/dashboard/merch")
    redirect("/dashboard/merch")
}

export const deleteMerch = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await prisma.$transaction([
            prisma.Merch.delete({
                where: {
                    id: id
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to delete merch")
    }
    revalidatePath("/dashboard/merch")
}

export const updateMerch = async (formData) => {
    const { id, title, cost, type, isAvailable, description } = Object.fromEntries(formData);

    let isAvailable_bool = (isAvailable === 'true')

    try {
        await prisma.$transaction([
            prisma.Merch.update({
                where: {
                    id: id
                },
                data: {
                    title: title || undefined,
                    costInCents: Number(cost)*100 || undefined,
                    isAvailable: isAvailable_bool,
                    type: type,
                    description: description || undefined
                }
            })
        ])
    } catch(err) {
        console.log(err)
        throw new Error("Failed to update merch")
    }
    revalidatePath("/dashboard/merch")
    redirect("/dashboard/merch")  
}

export const handleLogout = async () => {
    "use server"
    await signOut({ callbackUrl: '/', redirect:true })
}

export const register = async (previousState, formData) => {
    const { fname, lname, password, passwordRepeat, studentID, email, membershipType, collegeYear, shirtSize, major } = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }

    if (studentID.length > 10 || studentID.length < 8) {
        return {error: "StudentID is incorrect"}
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
        return {error: "Failed to access server. Please try again later."}
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