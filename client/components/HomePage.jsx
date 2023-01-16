import React, { Component } from "react";
import { Link } from 'react-router-dom'
import '../stylesheets/homepage.css'

class searchForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quality_meals: 1,
            quality_drinks: 1,
            space: 1,
            sound: 1,
            outlets: 1,
            parking: 1,
            wifi: 1,
            shopname: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }
  

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(JSON.stringify(this.state));
    }

    handleChangeSearch(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(JSON.stringify(this.state));
    }

    render () {

        return (
        <div className="homePageForms">
          <div className="searchByCriteriaForms">
            <form>
                <label>Minimum rating for: </label>
                <br/>
              <label>
                Meal quality: 
                <input type='number' name='quality_meals' value={this.state.quality_meals} onChange={this.handleChange} />
              </label>
              <br/>
              <label>
                Drink quality: 
                <input type='number' name='quality_drinks' value={this.state.quality_drinks} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                Atmosphere: 
                <input type='number' name='space' value={this.state.space} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                Noise level: 
                <input type='number' name='sound' value={this.state.sound} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                Outlet availability: 
                <input type='number' name='outlets' value={this.state.outlets} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                Parking options: 
                <input type='number' name='parking' value={this.state.parking} onChange={this.handleChange} />
              </label>
              <br />
              <label>
                WIFI quality: 
                <input type='number' name='wifi' value={this.state.wifi} onChange={this.handleChange} />
              </label>
              <br />
                <div className="searchCriteria-btn">
                  <Link to={'/shoplist'}  query={ { state: this.state }}><button>Search</button></Link>
                </div>
            </form>
          </div>
          <div className="homepageSearchForm">
            <input type='text' className="search-bar" value={this.state.searchName} onChange={this.handleChangeSearch} placeholder="Search coffee shop name..." />
              <Link to={'/shoplist'} params={ { state: this.state }} >
                <button className="search-bar-button">
                  <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="1.0em" width="1.0em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                  </svg>
                </button>
              </Link>
          </div>
        </div>
        )
    }
}

export default searchForm;
 //num for food, drinks, space, sound, outlets, parking, wifi