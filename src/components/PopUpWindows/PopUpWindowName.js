import React from 'react';

const PopUpWindowName = ({ success, onInputChange, changeName, closePopUpWindow }) => {
  let successSign = '';

  if (success === 'true') {
    successSign = <span className='edit success'>Success!</span>;
  } else if (success === 'false') {
    successSign = <span className='edit error'>Oops! Try again.</span>;
  }

  return (
    <div className='popup-window-back'>
      <div className='popup-window-front'>
        <span className='popup-window-close' title='Close' onClick={closePopUpWindow}>&times;</span>
        <h6 className='popup-window-title'>Edit name</h6>
        <div className='popup-window-content'>
          <label htmlFor='new-name'>New name:</label><br />
          <input type='text' name='new-name' id='new-name' onChange={onInputChange} required />
        </div>
        {successSign}
        <input type='submit' value='Edit name' id='submit-changes' onClick={changeName} />
      </div>
    </div>
  );
}

export default PopUpWindowName;
