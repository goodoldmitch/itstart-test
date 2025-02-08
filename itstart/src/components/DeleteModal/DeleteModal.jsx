import styles from "./DeleteModal.module.css"

function DeleteModal({ seminarTitle, onDelete, onCancel, loading }) {
  return (
    <div className={styles.modal}>
      <h2>Удалить семинар?</h2>
      <p>Вы уверены, что хотите удалить «{seminarTitle}»?</p>
      <div className={styles["modal-buttons"]}>
        <button className={styles.confirm} onClick={onDelete} disabled={loading}>
          {loading ? "Удаление..." : "Удалить"}
        </button>
        <button className={styles.cancel} onClick={onCancel} disabled={loading}>
          Отмена
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
