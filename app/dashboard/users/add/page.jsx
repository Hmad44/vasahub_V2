import prisma from '@/lib/prisma.js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { MemberType, CollegeYear, ShirtSize } from "@prisma/client";
import bcrypt from 'bcrypt'
import styles from '@/app/ui/dashboard/users/addUser/addUser.module.css'

async function addMember(formData) {
    "use server"
    const { fname, lname, password, studentID, email, membershipType, collegeYear, shirtSize, dueStatus, major } = Object.fromEntries(formData);
    
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)
    const due_status = (dueStatus == "true") ? true : false

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
        throw new Error("Failed to create user")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

const AddUserPage = () => {
    return (
        <div className={styles.container}>
            <form action={addMember} className={styles.form}>
                <input type="text" placeholder='First Name' name='fname' required />
                <input type="text" placeholder='Last Name' name='lname' required />
                <input type="text" placeholder='Password' name='password' required />
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
                <input type="text" placeholder='Major' name='major' required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddUserPage