import React from "react";
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'       //AXIOS package usage for promise handling

export default function Home(props) {
    const [data, setData] = React.useState([])      //State for incoming API data


    React.useEffect(() => {
        axios.get('http://localhost:5000/api/get').then((response) => {     //useEffect hook for setting our API data
            setData(response.data)
        })
    })

    const deleteNote = (id) => {
        if (window.confirm("Are you sure that you want to delete that note?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`)          
            toast.success("Note deleted successfully")                              //Delete Note function
            setTimeout(() => {
                axios.get('http://localhost:5000/api/get').then((response) => {
                    setData(response.data)
                }, 500)
            })
        }
    }

    return (
        data.length > 0 ?               //Ternary operator
        <div className="wrapper">
        <main className={`main-${props.darkMode ? "dark" : ""}`}>
                {data.map((card) => {
                    return (
                        <div key={card.id} className={`card-component-${props.darkMode ? "dark" : ""}`}>
                            <h4>{card.notes_title}</h4>
                            <h6>Category: {card.category_name}</h6>
                            <div className="card-component-body">
                            <p>{card.notes_body}</p>
                            </div>
                            <p className="last-modified">Last Modified : {card.formatedDate}</p>
                            <div className="buttons">
                                <Link to={`/update/${card.id}`}>
                                    <button className="btn-edit" title="Edit Note">
                                    <img src="../images/edit_icon.png" alt="edit-icon" className="edit-icon"/>
                                    </button>
                                </Link>
                                <button className="btn-delete" title="Delete Note" onClick={() => deleteNote(card.id)}>
                                    <img src="../images/delete_icon.png" alt="delete-icon" className="delete-icon"/>
                                </button>
                            </div>
                        </div>
                    )
                })}

            </main>
            <Link to="/AddNote">
                    <button title="Add a new note" className="addNote">+</button>
                </Link>
            </div>

            : <main className={props.darkMode ? "dark" : ""}>
                <h1 className="no-notes">No notes found!</h1>
                <img src="../images/no-notes.svg" alt="no-notes-img" className="no-notes-img"/>
                                <Link to="/AddNote">
                    <button className="add-new-note">Create one now</button>
                </Link>
            </main>


    )
}