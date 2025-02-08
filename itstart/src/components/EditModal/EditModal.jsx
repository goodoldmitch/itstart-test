import { useState } from "react"
import styles from "./EditModal.module.css"

function EditModal({ seminar, onSave, onCancel, loading }) {
  const [title, setTitle] = useState(seminar.title)
  const [description, setDescription] = useState(seminar.description)
  const [date, setDate] = useState(seminar.date)
  const [time, setTime] = useState(seminar.time)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...seminar, title, description, date, time })
  }

  return (
    <div className={styles.modal}>
      <h2>Редактировать семинар</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <div className={styles["modal-buttons"]}>
          <button className={styles.save} type="submit" disabled={loading}>
            {loading ? "Сохранение..." : "Сохранить"}
          </button>
          <button className={styles.cancel} type="button" onClick={onCancel} disabled={loading}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditModal
