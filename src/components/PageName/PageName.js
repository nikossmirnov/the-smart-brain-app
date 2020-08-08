import React from 'react';
import './PageName.css';

const PageName = ({ route }) => {
  let page = '';

  if (route === 'signIn') {
    page = '';
  } else if (route === 'register') {
    page = 'Register | ';
  } else if (route === 'home') {
    page = 'Home | ';
  } else if (route === 'settings') {
    page = 'Settings | ';
  }

  return <h1 className='page-name'>{page}The Smart Brain App</h1>;
}

export default PageName;
