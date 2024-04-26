import styles from '@/app/ui/dashboard/users/users.module.css'
import Paging from '@/app/ui/paging/paging'
import Search from '@/app/ui/search/search'
import Link from "next/link"
import { getAllMembers } from '@/app/lib/data'
import { deleteMember } from '@/app/lib/action'

const UsersPage = async ({searchParams}) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const [count, members] = await getAllMembers(q, page)

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for members"/>
                <Link href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Student ID</td>
                        <td>Due Status</td>
                        <td>Shirt Size</td>
                        <td>Major</td>
                        <td>College Year</td>
                        <td>Member Role</td>
                        <td>Joined</td>
                        <td>Updated</td>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td>{member.profile.f_name} {member.profile.l_name}</td>
                            <td>{member.email}</td>
                            <td>{member.student_id}</td>
                            <td>{(member.profile.due_status) ? "Paid" : "Unpaid"}</td>
                            <td>{member.profile.shirt_size}</td>
                            <td>{member.profile.major}</td>
                            <td>{member.profile.college_year.charAt(0) + member.profile.college_year.slice(1).toLowerCase()}</td>
                            <td>{member.membership_type.charAt(0) + member.membership_type.slice(1).toLowerCase()}</td>
                            <td>{member.createdAt.toLocaleDateString()}<br/>{member.createdAt.toLocaleTimeString()}</td>
                            <td>{member.updatedAt.toLocaleDateString()}<br/>{member.updatedAt.toLocaleTimeString()}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/${encodeURIComponent(member.id)}`}>
                                        <button className={`${styles.button} ${styles.view}`}>View</button>
                                    </Link>
                                    <form action={deleteMember}>
                                        <input type="hidden" name='id' value={member.profile.id} />                                      
                                        <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paging count={count}/>
        </div>
    )
}

export default UsersPage