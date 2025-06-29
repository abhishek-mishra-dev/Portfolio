import React, { useContext, useState } from 'react'
import './Header.css'
import { UserContext } from '../../context/portfoliocontext';
import {Link} from 'react-router-dom'
import Login from '../login/Login';
const Header = () => {
  const {user, setUser}=useContext(UserContext);
  const [isLogin,setIsLogin]=useState(false);

  return (<>
    <header className='sticky-header'>
        <nav className="navbar fix-width">
            <ul className='list'>
                <li><a href="/">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">skills</a></li>
                <li><a href="#about">Education</a></li>
                <li><a href="#contacts">Contacts</a></li>
                <li>{user ? <Link to="/dashboard" className='btn'>Dashboard</Link> :<Link href="#" className='btn'onClick={()=>setIsLogin(true)}>Login</Link> }</li>
            </ul>
        </nav>
    </header>
    {isLogin && <Login setIsLogin={setIsLogin}/>}
    </>
  )
}

export default Header;