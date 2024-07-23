import React from 'react';
import myImage from '../images/dr.jpg';

const ash = {
  backgroundImage: `url(${myImage})`
  }

const HomePage = () => {
  return <>
    <div style={{ash}}>
    <h1 className='container d-flex justify-content-left' style={{backgroundColor: 'beige'}}>HealthPlus+</h1>
    <div style={{textAlign:'left', marginLeft:'15px', marginTop:'25px'}}>
    <h2>Lets make Doctor Consultation easier !</h2>
    <p>Choose your date time and most importantly your own trusted Doctors here !!!</p>
    </div>
    <div style={{textAlign:'right'}} >
    <img src={myImage} 
         alt='react logo' 
         className='image' 
         />
    </div>
    </div>
  </>

;
};

export default HomePage;
