import { useEffect, useState } from "react"
import axios from "axios"
import SeminarItem from "./components/SeminarItem/SeminarItem"
import Loading from "./components/Loading"
import DeleteModal from "./components/DeleteModal/DeleteModal"
import EditModal from "./components/EditModal/EditModal"

function App() {
  const [seminars, setSeminars] = useState([])
  const [errorMessage, setErrorMesage] = useState()
  const [deleteSeminar, setDeleteSeminar] = useState(null)
  const [editSeminar, setEditSeminar] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)

  // Загружаем список при загрузке страницы
  useEffect(() => {
    axios
      .get('http://localhost:3001/seminars')
      .then((response) => setSeminars(response.data))
      .catch((error) => setErrorMesage(error.message))
  }, [])

  // Удаление семинара
  const handleDelete = async () => {
    if (!deleteSeminar) return
    setLoadingDelete(true)

    try {
      await axios.delete(`http://localhost:3001/seminars/${deleteSeminar.id}`)
      setSeminars(seminars.filter(s => s.id !== deleteSeminar.id))
      setDeleteSeminar(null)
    } catch (error) {
      console.error("Ошибка удаления:", error)
      setErrorMesage("Ошибка при удалении семинара")
    } finally {
      setLoadingDelete(false)
    }
  }

  // Редактирование семинара
  const handleEdit = async (updatedSeminar) => {
    setLoadingEdit(true)

    try {
      const response = await axios.put(
        `http://localhost:3001/seminars/${updatedSeminar.id}`,
        updatedSeminar
      )

      setSeminars(
        seminars.map(s => (s.id === updatedSeminar.id ? response.data : s))
      )
      setEditSeminar(null) // Закрываем окно редактирования
    } catch (error) {
      console.error("Ошибка редактирования:", error)
      setErrorMesage("Ошибка при редактировании семинара")
    } finally {
      setLoadingEdit(false)
    }
  }

  const openDeleteModal = (seminar) => {
    setEditSeminar(null) // Закрываем окно редактирования, если оно было открыто
    setDeleteSeminar(seminar)
  }

  const openEditModal = (seminar) => {
    setDeleteSeminar(null) // Закрываем окно удаления, если оно было открыто
    setEditSeminar(seminar)
  }

  return (
    <>
      <h1>Itstart test</h1>
      <section className="seminars">
        {errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          seminars.length > 0 ? (
            seminars.map((seminar) => (
              <SeminarItem
                key={seminar.id}
                {...seminar}
                clickDelete={() => openDeleteModal(seminar)}
                clickEdit={() => openEditModal(seminar)}
              />
            ))
          ) : (
            <Loading />
          )
        )}
      </section>

      {deleteSeminar && (
        <DeleteModal
          seminarTitle={deleteSeminar.title}
          onDelete={handleDelete}
          onCancel={() => setDeleteSeminar(null)}
          loading={loadingDelete}
        />
      )}

      {editSeminar && (
        <EditModal
          seminar={editSeminar}
          onSave={handleEdit}
          onCancel={() => setEditSeminar(null)}
          loading={loadingEdit}
        />
      )}
    </>
  )
}

export default App
