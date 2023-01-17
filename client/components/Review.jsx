import React from 'react';
import '../stylesheets/review.css';

export default function Review(props) {
  const { drinks, food, outlets, parking, sound, space, wifi, username } = props;
            
  return (
    <div className='review-container'>
        <div className="review">
          {Object.keys(props).map(prop => {
            if(!['currentUser'].includes(prop)) return (<div className='review-grid-item'>{prop}: {props[prop]}</div>);
          })}
        </div>
      {username === props.currentUser && <div><button className='delete-review-button'>Delete Review</button><button className='update-review-button'>Update Review</button></div>}
    </div>
    
  )
}

