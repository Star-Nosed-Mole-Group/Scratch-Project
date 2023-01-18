import React, { useEffect, useState } from 'react'
import Review from './Review';
import '../stylesheets/focusedshop.css';


export default function FocusedShop(props) {
    const [reviews, setReviews] = useState([]);
    const { drinks, food, name, outlets, parking, sound, space, wifi, _id, setIsFocused, fetchShopMatches, currentUser } = props;
    const replacedName = name.replaceAll('"', '\'');
    console.log("id ", _id)
    const [ addReview, setAddReview ] = useState({
        drinks: 0,
        food: 0,
        outlets: 0,
        parking: 0,
        sound: 0,
        space:0,
        wifi:0,
        shopId: _id,
        username: currentUser
    });

    
    useEffect(() => {
      const query = `?shopId=${_id}`;
      fetch(`/api/coffee/reviews/${query}`)
        .then(res => res.json())
        .then(res => {
            setReviews(res);
        })
    }, []);


    const handleAddReviewClick = () => {
        console.log(currentUser)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addReview)
          };
        const query = `?shopId=${_id}`;
        fetch(`/api/coffee/addreview/${query}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            console.log('response: ', res);
            setReviews(res);
            fetchShopMatches();
        })
          .catch(e => console.log(e));
    }
    
  return (
    <div className='focused-shop'>
        <div className="shopName">{replacedName} Reviews</div>
        <div onClick={() => setIsFocused()} className="exit-focus">X</div>
        <div className="review-container">
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
                    currentUser={currentUser}
                />
            })}
        </div>
        <div className="add-review-container">
            <div className="add-review-item">
                <span>Drinks</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {drinks: 1}))} className={addReview.drinks >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {drinks: 2}))} className={addReview.drinks >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {drinks: 3}))} className={addReview.drinks >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {drinks: 4}))} className={addReview.drinks >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {drinks: 5}))}className={addReview.drinks >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Food</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {food: 1}))} className={addReview.food >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {food: 2}))} className={addReview.food >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {food: 3}))} className={addReview.food >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {food: 4}))} className={addReview.food >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {food: 5}))} className={addReview.food >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Outlets</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {outlets: 1}))} className={addReview.outlets >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {outlets: 2}))} className={addReview.outlets >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {outlets: 3}))} className={addReview.outlets >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {outlets: 4}))} className={addReview.outlets >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {outlets: 5}))} className={addReview.outlets >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Parking</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {parking: 1}))} className={addReview.parking >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {parking: 2}))} className={addReview.parking >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {parking: 3}))} className={addReview.parking >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {parking: 4}))} className={addReview.parking >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {parking: 5}))} className={addReview.parking >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Sound</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {sound: 1}))} className={addReview.sound >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {sound: 2}))} className={addReview.sound >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {sound: 3}))} className={addReview.sound >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {sound: 4}))} className={addReview.sound >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {sound: 5}))}className={addReview.sound >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Space</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {space: 1}))} className={addReview.space >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {space: 2}))} className={addReview.space >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {space: 3}))} className={addReview.space >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {space: 4}))} className={addReview.space >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {space: 5}))}className={addReview.space >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            <div className="add-review-item">
                <span>Wifi</span>
                <div>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {wifi: 1}))} className={addReview.wifi >= 1 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {wifi: 2}))} className={addReview.wifi >= 2 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {wifi: 3}))} className={addReview.wifi >= 3 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {wifi: 4}))} className={addReview.wifi >= 4 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                    <span onClick={() => setAddReview(Object.assign({}, {...addReview}, {wifi: 5}))}className={addReview.wifi >= 5 ? 'fa fa-star checked' : 'fa fa-star star'}></span>
                </div>
            </div>
            

            <button className='addReview-btn' onClick={() => handleAddReviewClick()}>Add Review</button>
        </div>
    </div>
  )
}
