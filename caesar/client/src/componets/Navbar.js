import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Auth from "../utils/auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  if (Auth.loggedIn())
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
           CAESAR
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option1'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Food
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Entertainment
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Adventure
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/savedplaces'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Saved
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={() => Auth.logout()}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
    ); else {
    return (
      <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
           CAESAR
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option1'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Option1
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Option2
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/option3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Option3
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
    )
  }
}

export default Navbar;