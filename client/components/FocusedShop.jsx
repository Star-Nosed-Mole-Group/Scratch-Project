import React, { useEffect, useState } from 'react'
import Review from './Review';

export default function FocusedShop(props) {
    const [reviews, setReviews] = useState([]);
    const { drinks, food, name, outlets, parking, sound, space, wifi, _id, setIsFocused } = props;
    
    useEffect(() => {
      const query = `?id=${_id}`;
      fetch(`http://localhost:8080/api/coffee/reviews/${query}`)
        .then(res => res.json())
        .then(res => {
            setReviews(res);
        })
    }, []);

  return (
    <div className='focused-shop'>
        <div className="shopName">{name} Reviews</div>
        <button className='addReview-btn'>Add Review</button>
        <div onClick={() => setIsFocused()} className="exit-focus">X</div>
        { reviews.map(review => {
            const { drinks, food, username, outlets, parking, sound, space, wifi} = review;
            return <Review
                drinks={drinks}
                food={food}
                outlets={outlets}
                parking={parking}
                sound={sound}
                space={space}
                wifi={wifi}
                username={username}
                key={_id}
            />
        })}
    </div>
  )
}
