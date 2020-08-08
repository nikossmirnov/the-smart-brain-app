import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  return (
    <div className='rank'>
      <p>{`${name}, your current entry count is `}<span>{entries}</span></p>
    </div>
  );
}

export default Rank;
