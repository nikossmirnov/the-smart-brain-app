import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='logo'>
      <Tilt className='tilt' options={{ max: 30 }}>
        <div className='tilt-inner'><img src={brain} alt='Logo' /></div>
      </Tilt>
    </div>
  );
}

export default Logo;
