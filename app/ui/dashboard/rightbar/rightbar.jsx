import Image from "next/image"
import styles from './rightbar.module.css'
import { MdPlayCircleFilled } from "react-icons/md"

const RightBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/astronaut.png" alt="" fill className={styles.bgImage} />
                </div>
                <div className={styles.texts}>
                    <h3 className={styles.title}>Lorem Ipsum Dolor</h3>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum, sem vel tristique ornare, neque ante finibus risus, in dapibus lorem nibh non ligula. Mauris posuere arcu elit, vitae auctor nibh venenatis non. Mauris a diam id urna facilisis tempus. Pellentesque facilisis consectetur orci quis varius.</p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled/>
                        Button
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image src="/astronaut.png" alt="" fill className={styles.bgImage} />
                </div>
                <div className={styles.texts}>
                    <h3 className={styles.title}>Lorem Ipsum Dolor</h3>
                    <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum, sem vel tristique ornare, neque ante finibus risus, in dapibus lorem nibh non ligula. Mauris posuere arcu elit, vitae auctor nibh venenatis non. Mauris a diam id urna facilisis tempus. Pellentesque facilisis consectetur orci quis varius.</p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled/>
                        Button
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightBar