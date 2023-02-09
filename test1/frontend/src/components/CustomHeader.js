import React from 'react'

const CustomHeader = () => {
    return(
        <div>
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark"> 
                    <a href="http://localhost:3000/" className = "navbar-brand header-text d-flex align-items-center"> 
                        <img src="https://raw.githubusercontent.com/ShahirJalal/ReferencePoint/a8fbc0f807b8dd8fc16dca0cb14c59084b0d6bf1/images/filmfrenzy-low-resolution-logo-color-on-transparent-background.svg" alt="Movie Application Logo" height="30" style={{marginRight: "10px"}} />
                    </a>
                </nav>
            </header>
        </div>
    )
}

export default CustomHeader