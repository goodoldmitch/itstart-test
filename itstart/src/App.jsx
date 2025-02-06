import { useEffect, useState } from "react"
import axios from "axios"
import SeminarItem from "./components/SeminarItem/SeminarItem"
import Loading from "./components/Loading"

function App() {

  const [seminars, setSeminars] = useState([])
  const [errorMessage, setErrorMesage] = useState()

  useEffect(()=>{
    axios
      .get('http://localhost:3001/seminars')
      .then((response) => {
        setSeminars(response.data)
      })
      .catch((error)=>{
        setErrorMesage(error.message)
      })
      
  },[])
  
  return (
    <>
      <h1>Itstart test</h1>
      <section className="seminars">
        {errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ):(
          seminars.length > 0 ? (
            seminars.map((seminar) => (
              <SeminarItem key={seminar.id} {...seminar}/>
            ))
          ):(
            <Loading />
          )
        )
        }
      </section>
      
    </>
  )
}

export default App
