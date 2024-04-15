import styles from "@/app/ui/dashboard/users/viewUser/viewUser.module.css"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { MemberType, CollegeYear, ShirtSize } from "@prisma/client";
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma.js'

async function getMember(id){
    try {
        const member = await prisma.$transaction([
            prisma.Member.findUnique({
                include: {
                    profile: true
                },
                where: {
                    id: id
                },
            })  
        ])
        return member[0];
    } catch(err) {
        console.log(err)
        throw new Error("Failed to find member")
    }
}

async function updateMember(formData) {
    "use server"
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
                            where: {
                                f_name: "Ahmed"
                            },
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

const ViewUserPage = async ({params}) => {
    const { id } = params;
    const member = await getMember(id)
    return (
        <div className={styles.container}>
            <form action={updateMember} className={styles.form}>
                <input type="hidden" name="id" value={member.id} />
                <label>First Name</label>
                <input type="text" name="fname" placeholder={member.profile.f_name} />
                <label>Last Name</label>
                <input type="text" name="lname" placeholder={member.profile.l_name} />
                <label>Password</label>
                <input type="text" name="password" />
                <label>Student ID</label>
                <input type="number" name="studentID" placeholder={member.student_id} />
                <label>Email</label>
                <input type="email" name="email" placeholder={member.email} />
                <label>Major</label>
                <input type="text" name="major" placeholder={member.profile.major} />
                <label>Membership Type</label>
                    <select name="membership_type" id="membership_type">
                        <option value={MemberType.GENERAL} selected={member.membership_type == MemberType.GENERAL}>General Member</option>
                        <option value={MemberType.ALUMNI} selected={member.membership_type == MemberType.ALUMNI}>Alumni</option>
                        <option value={MemberType.ADMIN} selected={member.membership_type == MemberType.ADMIN}>Admin</option>
                    </select>
                <label>College Year</label>
                    <select name="college_year" id="college_year">
                        <option value={CollegeYear.FRESHMAN} selected={member.profile.college_year == CollegeYear.FRESHMAN}>Freshman</option>
                        <option value={CollegeYear.SOPHOMORE} selected={member.profile.college_year == CollegeYear.SOPHOMORE}>Sophomore</option>
                        <option value={CollegeYear.JUNIOR} selected={member.profile.college_year == CollegeYear.JUNIOR}>Junior</option>
                        <option value={CollegeYear.SENIOR} selected={member.profile.college_year == CollegeYear.SENIOR}>Senior</option>
                        <option value={CollegeYear.SUPERSENIOR} selected={member.profile.college_year == CollegeYear.SUPERSENIOR}>Super Senior</option>
                        <option value={CollegeYear.ALUMNI} selected={member.profile.college_year == CollegeYear.ALUMNI}>Alumni</option>
                    </select>
                <label>Shirt Size</label>
                    <select name="shirt_size" id="shirt_size">
                        <option value={ShirtSize.XS} selected={member.profile.shirt_size == ShirtSize.XS}>XS</option>
                        <option value={ShirtSize.S} selected={member.profile.shirt_size == ShirtSize.S}>S</option>
                        <option value={ShirtSize.M} selected={member.profile.shirt_size == ShirtSize.M}>M</option>
                        <option value={ShirtSize.L} selected={member.profile.shirt_size == ShirtSize.L}>L</option>
                        <option value={ShirtSize.XL} selected={member.profile.shirt_size == ShirtSize.XL}>XL</option>
                    </select>
                <label>Dues Paid or Not</label>
                    <select name="due_status" id="due_status">
                        <option value={false} selected={member.profile.due_status == false}>Unpaid</option>
                        <option value={true} selected={member.profile.due_status == true}>Paid</option>
                    </select>
                <button>Update</button>
            </form>
        </div>
    )
}

export default ViewUserPage