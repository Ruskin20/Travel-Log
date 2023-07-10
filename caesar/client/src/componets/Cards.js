import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>We could put a title here</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              // src='images/'
              text='We could put picture of Food here'
              label='Food'
              path='/option1'
            />
            <CardItem
              // src='images/'
              text='We could put picture of Entertainment here'
              label='Entertainment'
              path='/option2'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              // src='images/'
              text='We could put picture of Adventure here'
              label='Adventure'
              path='/option3'
            />
         
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;