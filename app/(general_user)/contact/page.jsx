"use client"

import Image from 'next/image'
import styles from './contact.module.css'

const ContactPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src="https://cdn-icons-png.flaticon.com/512/7269/7269995.png" alt="" fill className={styles.img}/>
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <input type="text" placeholder='Full Name' />
                    <input type="email" placeholder='Email Address' />
                    <input type="tel" placeholder='Phone Number (Optional)' />
                    <textarea 
                        name="" 
                        id="" 
                        cols="30" 
                        rows="10" 
                        placeholder="Message">
                    </textarea>
                    <button className={styles.button}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage