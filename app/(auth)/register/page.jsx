import RegisterForm from '@/app/ui/registerForm/registerForm'
import styles from './register.module.css'


const RegisterPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
            <h5>Only for students of the University of Mississippi!</h5>
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage