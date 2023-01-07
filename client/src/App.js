import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import { ToastContainer } from 'react-toastify'; //Notifications package and its styles
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AddNote from "./pages/AddNote"         //Import Application pages from other files
import Navbar from './components/Navbar'
import React from "react";

export default function App() {

  const [darkMode, setDarkMode] = React.useState(true)   //State for Light Mode/ Dark Mode (Dark Mode initialised)
    
  function toggleDarkMode() {
    if(darkMode){
      document.body.style.backgroundColor = "#ECEBF3";
    }else{                                              
      document.body.style.backgroundColor = "#1A1B41";
    }
      setDarkMode(prevMode => !prevMode)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} />  {/*Dark Mode is passed through props to the Navbar component*/}
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path='/' element={<Home darkMode={darkMode}/>} />
          <Route path='/AddNote' element={<AddNote darkMode={darkMode}/>} />      {/*Route for AddNote page*/}
          <Route path='/update/:id' element={<AddNote darkMode={darkMode}/>} />   {/*Route for UpdateNote page*/}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

