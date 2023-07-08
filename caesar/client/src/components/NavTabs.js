import React from 'react';
import '../styles/NavTabs.css';

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div className='header-wrap'>
      <ul className="nav nav-tabs main">
        <li className="nav-item col-1">
          <a
            href="#home"
            onClick={() => handlePageChange('Home')}

            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
          >
            Caesar
          </a>
        </li>
        <li className="nav-item col-1">
          <a
            href="#login"
            onClick={() => handlePageChange('LogIn')}

            className={currentPage === 'LogIn' ? 'nav-link active' : 'nav-link'}
          >
            Log In/Sign Up
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavTabs;