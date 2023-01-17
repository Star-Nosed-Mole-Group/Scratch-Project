import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/shoplist.css';
import Shop from "./Shop";

const ShopList = props => {

  const[matches, setMatches] = useState([]);
  const location = useLocation();
  const { from } = location.state;
  const { quality_meals, quality_drinks, space, sound, outlets, parking, wifi, shopname } = from;  
  
  const fetchShopMatches = () => {
    const query = `?quality_meals=${quality_meals}&quality_drinks=${quality_drinks}&space=${space}&sound=${sound}&outlets=${outlets}&parking=${parking}&wifi=${wifi}`;
    fetch(`http://localhost:8080/api/coffee/${query}`)
      .then(res => res.json())
      .then(res => {
        console.log(res); // array of objects [{}, {}]
        setMatches(res);
      })
  }
  useEffect(() => {
    fetchShopMatches();
  }, []);


  return (
    <div className="shopListContainer">
      <h1>List of all shops</h1>
      <div className="matches">
        {matches.map((shop) => {
          const { drinks, food, name, outlets, parking, sound, space, wifi, _id } = shop;
          return <Shop 
                 drinks={drinks}
                 food={food}
                 name={name}
                 outlets={outlets}
                 parking={parking}
                 sound={sound}
                 space={space}
                 wifi={wifi}
                 _id={_id}
                 key={`shop${_id}`}
                 fetchShopMatches={fetchShopMatches}
          />
        })}
      </div>
    </div>

  )
}

export default ShopList;