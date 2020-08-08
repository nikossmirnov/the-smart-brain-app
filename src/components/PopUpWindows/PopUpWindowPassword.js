import React from 'react';

const PopUpWindowPassword = ({ success, onInputChange, changePassword, closePopUpWindow }) => {
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
        <h6 className='popup-window-title'>Edit password</h6>
        <div className='popup-window-content'>
          <div>
            <label htmlFor='current-email'>Current email:</label><br />
            <input type='email' name='current-email' id='current-email' onChange={onInputChange} required /><br />
          </div>
          <div>
            <label htmlFor='current-password'>Current password:</label><br />
            <input type='password' name='current-password' id='current-password' onChange={onInputChange} required />
          </div>
          <div>
            <label htmlFor='new-password'>New password:</label><br />
            <input type='password' name='new-password' id='new-password' onChange={onInputChange} required /><br />
          </div>
        </div>
        {successSign}
        <input type='submit' value='Edit password' id='submit-changes' onClick={changePassword} />
      </div>
    </div>
  );
}

export default PopUpWindowPassword;
