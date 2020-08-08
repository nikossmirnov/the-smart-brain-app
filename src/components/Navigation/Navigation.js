import React from 'react';
import './Navigation.css';

const Navigation = ({ route, onRouteChange }) => {
  if (route === 'home' || route === 'settings') {
    return (
      <nav>
        <p tabIndex='0' onClick={() => onRouteChange('home')}>Home</p>
        <p tabIndex='0' onClick={() => onRouteChange('settings')}>Settings</p>
        <p tabIndex='0' onClick={() => onRouteChange('signOut')}>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p tabIndex='0' onClick={() => onRouteChange('signIn')}>Sign In</p>
        <p tabIndex='0' onClick={() => onRouteChange('register')}>Register</p>
      </nav>
    );
  }
}

export default Navigation;
