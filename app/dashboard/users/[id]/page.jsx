import styles from "@/app/ui/dashboard/users/viewUser/viewUser.module.css"
import { MemberType, CollegeYear, ShirtSize } from "@prisma/client";
import { getSingleMember } from "@/app/lib/data";
import { updateMember } from "@/app/lib/action";

const ViewUserPage = async ({params}) => {
    const { id } = params;
    const member = await getSingleMember(id)
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
                <label>Shirt Paid or Not</label>
                <select name="shirt_status" id="shirt_status">
                    <option value={false} selected={member.profile.shirt_status == false}>Unpaid</option>
                    <option value={true} selected={member.profile.shirt_status == true}>Paid</option>
                </select>
                <button>Update</button>
            </form>
        </div>
    )
}

export default ViewUserPage