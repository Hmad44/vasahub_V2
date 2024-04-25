import Image from "next/image"
import Link from "next/link"
import styles from "./home.module.css"

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Ole Miss Vietnamese American Student Association</h1>
                <p className={styles.desc}>
                The Ole Miss Vietnamese American Student Association (OleVASA) was created in order to promote an understanding of the Vietnamese culture within the university and the community at large, to develop and execute programs to support the interests of the university student bodies, to provide opportunities for greater expression of the Vietnamese culture, and to represent Vietnamese students at the University of Mississippi.</p>
                <p className={styles.desc}>At the OleVasa Hub website, you can view our regular yearly events and view our upcoming events in the current semester. If you are a current member of the University of Mississippi, you can also create an account and officially join our club.</p>
                <div className={styles.buttons}>
                    <Link href="./register">
                        <button className={styles.button}>Register</button>
                    </Link>
                    <Link href="./login">
                        <button className={styles.button}>Login</button>
                    </Link>
                </div>
                <div className={styles.socials}>
                    <Link href="https://linktr.ee/ole_vasa">
                        <Image src="https://www.childcareawareky.org/wp-content/uploads/2022/06/Linktree.png" fill className={styles.social}/>
                    </Link>
                    {/* <Link href="https://www.instagram.com/ole_vasa/">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/264px-Instagram_logo_2016.svg.png?20210403190622" fill className={styles.social} />
                    </Link>
                    <a>
                        <Image/>
                    </a>
                    <a>
                        <Image/>
                    </a> */}
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image src="https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/326712501_1346585702783845_166318177265216819_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5-hISFaiqhUAb6QO0fA&_nc_ht=scontent-atl3-1.xx&oh=00_AfCI6j7xYfylu8p11eeDLBiCqe4s2-49Rvzg9O9QsuvD1Q&oe=66223F3C" alt="Ole Vasa Logo" layout="responsive" width={200} height={200} className={styles.logoImg}/>
            </div>  
        </div>
    )
}

export default AboutPage