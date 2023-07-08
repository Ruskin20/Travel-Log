import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
    return(
    <div  className='size'>
        <footer>
            <ul className='nav nav-tabs main'>
                <li className='nav-item'><a href=''>About</a></li>
                <li className='nav-item'><a href=''>FAQ</a></li>
                <li className='nav-item'><a href=''>Contact</a></li>
            </ul>
        </footer>
        <p>Developed by Group XI</p>
    </div>
    )
}