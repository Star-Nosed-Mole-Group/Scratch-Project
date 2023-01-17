import { Link } from 'react-router-dom'
import React from 'react'
import '../stylesheets/signin.css'


class Signup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        // alert(' Event is ' + event.target.)
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;
        const requestOptions = {
            // mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        // alert('Username: ' + username + ' Password: ' + password)
        //const request = new Request ('http://localhost:3000/api/user/signup')
        fetch('http://localhost:3000/api/user/signup', requestOptions)
          .then(response => {
            response.json();
            alert('resonse status is: ' + response.status)
            alert('You have successfully signed up!');
            // redirect here
           // return <Redirect to='/home'/>412
          })
          .catch(err => console.log(err));
          event.preventDefault();       
    }

    render () {

        return (
            <div className='login'>
                <h1>Welcome to Coffee Shop ☕</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                    </label><br></br>
                        <input type="text" name="username" value={this.state.username} placeholder='Enter username' onChange={this.handleChange}/><br></br>
                    <label>
                        Password:
                    </label><br></br>
                        <input type="text" name="password" value={this.state.password} placeholder='Enter password' onChange={this.handleChange}/><br></br>
                    <input type="submit" value="Sign up!"/>
                </form>
              <div>
                <br/>
                  <Link to="/signin">
                     <button className='haveanaccount'>Already have an account?</button>
                  </Link>
              </div>
            </div>
        )
    }
}

export default Signup;