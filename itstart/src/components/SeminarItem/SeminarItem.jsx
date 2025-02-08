import styles from './SeminarItem.module.css'

function SeminarItem({title , description, date, time, photo, clickDelete, clickEdit}){

    return(
        <div className={styles.seminar}>
            <div className={styles.seminarImg}>
                <img src={photo} alt={title} />
            </div>
            <div className={styles.seminarText}>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
                <time>{time}</time>
            </div>
            <div className={styles.seminarControls}>
                <button onClick={clickEdit}>Изменить</button>
                <button onClick={clickDelete}>Удалить</button>
            </div>
        </div>
    )
}

export default SeminarItem