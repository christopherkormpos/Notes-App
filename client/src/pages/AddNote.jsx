import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const initialState = {
  notes_title: "",
  notes_body: ""
}

export default function AddNote(props) {

  const [state, setState] = React.useState(initialState)
  const { notes_title, notes_body } = state

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!notes_title || !notes_body) {
      toast.error("Please provide correct values")
        .then(navigate({ pathname: '/AddNote' }))

    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {
          notes_title,
          notes_body
        }).then(() => {
          setState({ notes_title: "", notes_body: "" })
        })
          .catch((err) => toast.error(err.response.data))
        toast.success("Note Added Succesfully")
      }
      else {
        axios.put(`http://localhost:5000/api/update/${id}`, {
          notes_title,
          notes_body
        }).then(() => {
          setState({ notes_title: "", notes_body: "" })
        })
          .catch((err) => toast.error(err.response.data))
        toast.success("Note Updated Succesfully")
      }

    }

    navigate({ pathname: '/' })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  return (
    <main className={props.darkMode ? "dark" : ""}>
      <div className='add-note' id="add-note">
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Title" className={`notes_title${props.darkMode ? "dark" : ""}`} name='notes_title' value={notes_title || ""} onChange={handleInputChange} />
          <textarea placeholder="Your note goes here" className={`notes_body${props.darkMode ? "dark" : ""}`} name='notes_body' value={notes_body || ""} onChange={handleInputChange} />
          <input type="submit" className="submit" value={id ? "Update Note" : "Save Note"} />
        </form>
      </div>
      <Link to="/">
        <input type="button" className="to-all-notes-button" value="To all Notes" />
      </Link>
    </main>
  )

}


