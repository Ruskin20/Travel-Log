import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
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
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Log In <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;