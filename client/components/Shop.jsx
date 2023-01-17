import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/shop.css'
// import Reviews from './Reviews'
import FocusedShop from './FocusedShop';

export default function Shop(props) {
    const { drinks, food, name, outlets, parking, sound, space, wifi, _id, fetchShopMatches } = props;
    
    const [ isFocused, setIsFocused ] = useState(false);
    
    const handleClick = () => {
      if(isFocused) setIsFocused(false);
      else setIsFocused(true);
    }
    
    return (
        <div>
          <div onClick={() => handleClick()} className='shop'>
              <h2>{name}</h2>
              <div className="shop-averages-container">
                {Object.keys(props).map(prop => {
                  if(!['name', 'fetchShopMatches', '_id'].includes(prop)) return (<div>{prop}: {props[prop]}</div>);
                })}
              </div>
          </div>
          {isFocused && <FocusedShop
                             drinks={drinks}
                             food={food}
                             name={name}
                             outlets={outlets}
                             parking={parking}
                             sound={sound}
                             space={space}
                             wifi={wifi}
                             _id={_id}
                             key={`focusedShop${_id}`}
                             setIsFocused={setIsFocused}
                             fetchShopMatches={fetchShopMatches}
          />}
        </div>
    )
}
