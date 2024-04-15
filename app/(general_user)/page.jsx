import Image from "next/image"
import Link from "next/link"
import styles from "./home.module.css"

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Ole Miss Vietnamese American Student Association</h1>
                <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ligula consectetur, congue magna eu, pellentesque velit. Mauris facilisis tempus erat, a vulputate nisl lacinia sit amet. Nam commodo ullamcorper lacus vitae vehicula. Suspendisse eu placerat libero, eu fringilla odio. Donec non nisl purus. Vestibulum in lacus vitae augue venenatis tristique.
                </p>
                <div className={styles.buttons}>
                    <Link href="./register">
                        <button className={styles.button}>Register</button>
                    </Link>
                    <Link href="./login">
                        <button className={styles.button}>Login</button>
                    </Link>
                </div>
                <div className={styles.socials}>
                    <Link href="https://linktr.ee/">
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