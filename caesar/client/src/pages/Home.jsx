import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <body className='form'>
            <form className='padTop'>
                 <label>
                     Enter your location (city, state, and/or zip code):
                    <input type="text" name="location" placeholder="The world is yours!"></input>
                 </label>
                 <div>
                    <div>
                        What is your desire?
                    </div>
                    <div>
                        Food
                        Entertainment
                        Adventure
                    </div>
                </div>
                <label>
                    Enter your budget here:
                    <input type="number" name="budget"></input>
                </label>
                <input type="submit" value="Ave! True to Caesar!"></input>
             </form>
        </body>
    );
  };
  
  export default Home;