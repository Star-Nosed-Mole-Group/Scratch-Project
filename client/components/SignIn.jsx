import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import '../stylesheets/signin.css'


function SignIn() {
    const [ username , SetUsername ] = useState('');
    const [password , SetPassword ] = useState('');

    // use this to log in -> username: hello  / password: beans
    const handleSubmit = () => {
      const requestOptions = {
        // mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password})
      };
      fetch('http://localhost:3000/api/user/login', requestOptions)
        .catch(err => console.log(err));
        // alert('Make get request');
    }
        return (
            <div className="login">
                <h1>Welcome to Coffee Shop ☕</h1>
                <div className="username">
                    <label htmlFor="username">Username</label><br></br>
                    <input placeholder='Enter your username' type="text" id="username" name="username" onChange={(e) => SetUsername(e.target.value)}></input>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label><br></br>
                    <input placeholder='Enter your password' type="password" id="password" name="password" onChange={(e) => SetPassword(e.target.value)}></input>
                </div><br></br>
                <div className="signin-btn">
                    <Link to={'/home'} state={{from: username}}><button onClick={handleSubmit}>Sign in</button></Link>
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

export default SignIn;
/**
 *     <Link to='/home'></Link>     is embedded in a div, button, list , etc
 */