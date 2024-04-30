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
                <p className={styles.desc}>At the OleVasa Hub website, you can view our regular yearly events and view our upcoming events in the current semester. If you are a current member of the University of Mississippi and are interested in joining us, you can also create an account and officially join to gain access to our club shirt and merchandise!</p>
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
                </div>
            </div>
            <div className={styles.imgContainer}>
                <Image src="/vasalogo.png" alt="Ole Vasa Logo" layout="responsive" width={200} height={200} className={styles.logoImg}/>
            </div>  
        </div>
    )
}

export default AboutPage