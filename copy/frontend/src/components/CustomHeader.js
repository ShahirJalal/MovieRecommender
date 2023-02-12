import React from 'react'
import { Link } from 'react-router-dom'

const CustomHeader = () => {
    const handleLogout = () => {
        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);
    };

    return(
        <div>
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark"> 
                    <div>
                        <a href="http://localhost:3000/" className = "navbar-brand header-text"> 
                            Movie Application
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/user-home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" onClick={handleLogout} className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default CustomHeader