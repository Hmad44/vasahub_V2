import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>OleVasa</div>
            <div className={styles.text}>© 2024</div>
        </div>
    )
}

export default Footer