import { Link } from 'react-router-dom'
import React from 'react'
import '../stylesheets/signin.css'


class SignIn extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: "",
            password: ""
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

    // use this to log in -> username: hello  / password: beans
    handleSubmit() {
      const requestOptions = {
        // mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      };
      fetch('http://localhost:3000/api/user/login', requestOptions)
        .catch(err => console.log(err));
        // alert('Make get request');
    }

    render () {

        return (
            <div className="login">
                <h1>Welcome to Coffee Shop</h1>
                <div className="username">
                <label htmlFor="username">Username</label><br></br>
                <input placeholder='Enter your username' type="text" id="username" name="username" onChange={(e) => this.handleChange(e)}></input>
                </div>
            <div className="password">
                <label htmlFor="password">Password</label><br></br>
                <input placeholder='Enter your password' type="password" id="password" name="password" onChange={(e) => this.handleChange(e)}></input>
            </div><br></br>
            <div className="signin-btn">
              <Link to={'/home'}><button onClick={this.handleSubmit}>Sign in</button></Link>
            </div>
                <div>
                 <Link to="/signup">
                    <button>Don't have an account?</button>
                 </Link>
                 <Link to="/home">
                    <button>So we can still access home</button>
                 </Link>
                </div>
            </div>
        )
    }
}

export default SignIn;
/**
 *     <Link to='/home'></Link>     is embedded in a div, button, list , etc
 */