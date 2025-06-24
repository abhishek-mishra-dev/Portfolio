import React from 'react'
import './PageNotFound.css'

const PageNotFound = () => {
    return (
        <>
            <div className="paga-not-found fix-width">
                <h1>Oop ! <span id="surname">Page Not Found</span></h1>
                <a href="/" id='back-home'>Home</a>
            </div>
        </>
    )
}

export default PageNotFound