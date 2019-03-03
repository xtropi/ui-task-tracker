import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
            <h3 className="brand-logo font-weight-bold mr-3">Task Tracker</h3>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item mr-3"><Link className="nav-link" to="/">Scrum desk</Link></li>
                <li className="nav-item mr-3"><Link className="nav-link" to="/tasklist">My tasks</Link></li>
            </ul>
            <ul className="navbar-nav navbar-right">
                <li className="nav-item mr-3"><Link className="nav-link" to="/logout">Logout</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar