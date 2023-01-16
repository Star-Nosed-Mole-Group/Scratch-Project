import React, { Component } from "react";

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
            wifi: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.quality_meals);
    }

    render () {

        return (
        <div className="homePageForm">
            <form onSubmit={this.handleSubmit}>
                <label>Minimun rating for: </label>
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
              <input type='submit' value='Search'/>
            </form>
        </div>
        )
    }
}

export default searchForm;
 //num for food, drinks, space, sound, outlets, parking, wifi