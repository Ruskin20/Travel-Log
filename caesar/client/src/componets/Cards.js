import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Have the best time of your life!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='./images/FoodPic.jpg'
              text='Find your favorite food here'
              label='Food'
              path='/food'
            />
            <CardItem
              src='./images/EntertainmentPic.jpg'
              text='Find your favorite entertainment here'
              label='Entertainment'
              path='/entertainment'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='./images/AdventurePic.jpg'
              text='Find your favorite adventure here'
              label='Adventure'
              path='/adventures'
            />
          </ul>

          
        </div>
      </div>
    </div>
  );
}

export default Cards;