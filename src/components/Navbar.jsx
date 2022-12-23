import { Link } from 'react-router-dom'
import React from 'react'

export default function Navbar(props) {
    return (
        <nav
            className={props.darkMode ? "dark" : ""}
        >
            <span>
            <Link to="/">
            <img className="nav--logo_icon" src="../images/logo-removed.png" alt='logo'/>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>Notes App</h1>
        </Link>
        </span>
            <div className="toggler">
                <p className="toggler--light">Light</p>
                <div
                    className="toggler--slider"
                    onClick={props.toggleDarkMode}>
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
        </nav>
    )
}