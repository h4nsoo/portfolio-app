
import React from 'react'
import { useState } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('home')
    
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-menu">
            <li 
              className={activeItem === 'home' ? 'active' : ''} 
              onClick={() => setActiveItem('home')}
            >
             <a> Home </a>
            </li>
            <li 
              className={activeItem === 'about' ? 'active' : ''} 
              onClick={() => setActiveItem('about')}
            >
              <a> About </a>
            </li>
            <li 
              className={activeItem === 'projects' ? 'active' : ''} 
              onClick={() => setActiveItem('projects')}
            >
              <a>Projects </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  
  export default Navbar
