/* eslint eqeqeq: 0 */   //Stops the warning message 'Expected '===' and instead saw '=='.' from appearing
import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const initialState = {
  notes_title: "",
  notes_body: "",
  category_id: 1,
}

export default function AddNote(props) {
  const [categoryData, setCategoryData] = React.useState([])
  const [state, setState] = React.useState(initialState)
  const { notes_title, notes_body ,category_id} = state
  //const [categoryId, setCategoryId] = React.useState(1);

  const navigate = useNavigate()  //Navigation Hook

  const { id } = useParams()  //UseParams Hook - for incoming id

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/getcategory').then((response) => {     //useEffect hook for setting our Category data
        setCategoryData(response.data)
    })
})


  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] })) //useEffect hook for when the id is passed as params to set the state as the spreaded response data
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()                                  //Prevents event default behavior when submiting
    if (!notes_title || !notes_body || !category_id || category_id == 1) {
      toast.error("Please provide correct values")      //Checks if there is a title and a body for the Note that is being updated or created
        .then(navigate({ pathname: '/AddNote' }))
    } else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {  //If no id is passed through params (meaning that a new Note is being created)
          notes_title,                                  //Post the note
          notes_body,
          category_id
        }).then(() => {
          setState({ notes_title: "", notes_body: ""}) //Re-Initialise an empty notes_title and notes_body state so thet the next time the state is not the same as the previous note
        })
          .catch((err) => toast.error(err.response.data))
        toast.success("Note Added Succesfully")
      }
      else {
        axios.put(`http://localhost:5000/api/update/${id}`, {   //If else, an id has been passed through params so it needs to be updated
          notes_title,
          notes_body,
          category_id
        }).then(() => {
          setState({ notes_title: "", notes_body: ""})
        })
          .catch((err) => toast.error(err.response.data))
        toast.success("Note Updated Succesfully")
      }

    }

    navigate({ pathname: '/' })   //When one of those 3 is done go to "/"
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target        //Function that catches the event object and sets the state object with the value of the current title or body being typed in
    setState({ ...state, [name]: value })
  }

  const handleOption = (e) => {
    const {value} = e.target
    setState({ ...state, category_id: value })  //Function for category option handling
  };


  return (
    <main className={props.darkMode ? "dark" : ""}>
      <div className='add-note' id="add-note">
        <form onSubmit={handleSubmit}>
        <p>Select Notes category : </p>
          <select value={category_id} name="category" className={props.darkMode ? "dark-select" : "select"} onChange={handleOption}>
            {categoryData.map((options)=>{
              return (
                <option value={options.id} id={options.id} name='category_id'>{options.name}</option>
              )
            })}
          </select>
          <textarea placeholder="Title" className={`notes_title${props.darkMode ? "dark" : ""}`} name='notes_title' value={notes_title || ""} onChange={handleInputChange} />
          <textarea placeholder="Your note goes here" className={`notes_body${props.darkMode ? "dark" : ""}`} name='notes_body' value={notes_body || ""} onChange={handleInputChange} />
          <input type="submit" className="submit" value={id ? "Update Note" : "Save Note"} />  {/*If an id has been passed the input button will display "Update" instead of "Save"*/}
        </form>
      </div>
      <Link to="/">
        <input type="button" className="to-all-notes-button" value="To all Notes" />
      </Link>
    </main>
  )
}


