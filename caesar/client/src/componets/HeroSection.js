import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

function HeroSection() {
  if (Auth.loggedIn()) 
  return (
    <div className='hero-container'>
 <video src= '/images/Vid.mp4' autoPlay loop muted />
     <h1>Caesar</h1>
      <p>The place to plan your trip!</p>
      <div className='hero-btns'>
      <form>
            <input
              className='footer-input'
              name='Zip-code'
              type='search'
              placeholder='Enter zip code'
            />
            <Button>Search</Button>
          </form>
      </div>
    </div>
  );
  else {
    return (
      <div className='hero-container'>
 <video src= '/images/Vid.mp4' autoPlay loop muted />
     <h1>Caesar</h1>
      <p>The place to plan your trip!</p>
      <div className='hero-btns'>
      <form>
            <input
              className='footer-input'
              name='Zip-code'
              type='search'
              placeholder='Enter zip code'
            />
            <Button buttonStyle='btn--primary'>Search</Button>
          </form>
          <Link
            to='/login'
          className='login'
          onClick={console.log('hey')}
            >
          Log In <i className='far fa-play-circle' />
            </Link>
      </div>
    </div>
    )
  }
}

export default HeroSection;