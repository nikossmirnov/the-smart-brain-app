import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ isDetecting, onInputChange, onButtonSubmit }) => {
  return (
    <div className='image-link-form'>
      <p>This Magic Brain will detect faces in your pictures. Give it a try.</p>
      <div className='form-input'>
        <input type='text' onChange={onInputChange} />
        <button onClick={onButtonSubmit}>{isDetecting ? 'Detecting...' : 'Detect'}</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;
