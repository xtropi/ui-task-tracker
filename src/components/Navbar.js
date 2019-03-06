import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            
            <h4 className="navbar-header navbar-brand brand-logo font-weight-bold mt-auto mr-3">Task Tracker</h4>
            <div className="navbar-collapse navbar-brand collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item mr-3"><Link className="nav-link" to="/">Scrum desk</Link></li>
                <li className="nav-item mr-3"><Link className="nav-link" to="/mytasks">My tasks</Link></li>
            </ul>
            <ul className="navbar-nav navbar-right">
                <li className="nav-item mr-3"><Link className="nav-link" to="/logout">Logout</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar