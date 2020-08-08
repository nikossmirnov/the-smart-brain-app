import React from 'react';

const PopUpWindowAccount = ({ success, onInputChange, deleteAccount, closePopUpWindow }) => {
  let successSign = '';

  if (success === 'true') {
    successSign = <span className='edit success'>Your account has been deleted.</span>;
  } else if (success === 'false') {
    successSign = <span className='edit error'>Oops! Try again.</span>;
  }

  return (
    <div className='popup-window-back'>
      <div className='popup-window-front'>
        <span className='popup-window-close' title='Close' onClick={closePopUpWindow}>&times;</span>
        <h6 className='popup-window-title'>Delete account</h6>
        <div className='popup-window-content'>
          <p>Are you sure you want to delete your account <span className='bold-text'>permanently</span>?</p>
          <label htmlFor='current-password'>Current password:</label><br />
          <input type='password' name='current-password' id='current-password' onChange={onInputChange} required />
        </div>
        {successSign}
        <input type='submit' value='Delete account' className='error' id='submit-changes' onClick={deleteAccount} />
      </div>
    </div>
  );
}

export default PopUpWindowAccount;
