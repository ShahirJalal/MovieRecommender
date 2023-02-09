import React from 'react'
import { Link } from 'react-router-dom'

const CustomHeader = () => {
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
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default CustomHeader