import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AddNote from "./pages/AddNote"
import Navbar from './components/Navbar'
import React from "react";

export default function App() {

  const [darkMode, setDarkMode] = React.useState(true)
    
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
                toggleDarkMode={toggleDarkMode} />
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path='/' element={<Home darkMode={darkMode}/>} />
          <Route path='/AddNote' element={<AddNote darkMode={darkMode}/>} />
          <Route path='/update/:id' element={<AddNote darkMode={darkMode}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

