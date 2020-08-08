import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  const boundingBoxes = boxes.map((box, ind) => {
    return <div
            key={ind} className='bounding-box'
            style={{
              left: box.leftCol,
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow
            }}>
          </div>
  });

  return (
    <div className='face-recognition'>
      <img id='image' alt='' src={imageUrl} />
      {boundingBoxes}
    </div>
  );
}

export default FaceRecognition;
