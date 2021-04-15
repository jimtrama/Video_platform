import { Link } from 'react-router-dom';
import React from 'react'
import './../Styles/forgot.css'
function Index(props) {
    document.title = 'Reset Pssword';
    return (
        <div className='forgotPageRoot'>
            <div className="logo" onClick={()=>{props.history.replace('/')}}></div>
            <div className="cardc">
                <div className="headingTitle">
                    <span className="title">Reset Password</span>
                    <span className="titlep">We will send you instruction right away.</span>
                </div>
                <div className="inputContainer">
                    <span className="inputTitle">Email</span>
                    <input type="text"  placeholder='Enter your email' className="inputtxt"/>
                </div>
                <button className="button">Send instractions</button>
                <Link to='/' class='back-to-signin'>Sing in</Link>
            </div>
        </div>
    )
}

export default Index
