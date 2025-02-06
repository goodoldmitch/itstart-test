import styles from './SeminarItem.module.css'

function SeminarItem({title , description, date, time, photo}){

    return(
        <div className={styles.seminar}>
            <div className={styles.seminarImg}>
                <img src={photo} alt={title} />
            </div>
            <div className="seminar-text">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{date}</span>
                <time>{time}</time>
            </div>
            <div className="seminar-controls">
                <button>Изменить</button>
                <button>Удалить</button>
            </div>
        </div>
    )
}

export default SeminarItem