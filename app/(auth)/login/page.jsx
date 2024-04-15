import { login } from "@/app/lib/action"
import LoginForm from "@/app/ui/loginForm/loginForm"
import styles from "./login.module.css"

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage