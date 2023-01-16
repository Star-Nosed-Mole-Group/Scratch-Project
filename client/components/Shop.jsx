import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/shop.css'
// import Reviews from './Reviews'
import FocusedShop from './FocusedShop';

export default function Shop(props) {
    const { drinks, food, name, outlets, parking, sound, space, wifi, _id } = props;
    
    const [ isFocused, setIsFocused ] = useState(false);
    
    const handleClick = () => {
      if(isFocused) setIsFocused(false);
      else setIsFocused(true);
    }
    
    return (
        <div>
          <div onClick={() => handleClick()} className='shop'>
              <h2>{name}</h2>
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
                             key={_id}
                             setIsFocused={setIsFocused}
          />}
        </div>
    )
}
