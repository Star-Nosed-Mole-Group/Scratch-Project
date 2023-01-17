import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../stylesheets/signin.css'


const Signup = props => {
    const [ username , SetUsername ] = useState('');
    const [ password , SetPassword ] = useState('');

    const handleSubmit = () => {
        const requestOptions = {
            // mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password})
    };

        // alert('Username: ' + username + ' Password: ' + password)
        //const request = new Request ('http://localhost:3000/api/user/signup')
    fetch('http://localhost:3000/api/user/signup', requestOptions)
      .then(response => {
        response.json();
        // alert('resonse status is: ' + response.status)
        alert('You have successfully signed up!');
      })
      .catch(err => console.log(err));      
    }
        return (
            <div className='login'>
                <h1>Welcome to Coffee Shop ☕</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                    </label><br></br>
                        <input type="text" name="username" value={username} placeholder='Enter username' onChange={(e) => SetUsername(e.target.value)}/><br></br>
                    <label>
                        Password:
                    </label><br></br>
                        <input type="text" name="password" value={password} placeholder='Enter password' onChange={(e) => SetPassword(e.target.value)}/><br></br>
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

export default Signup;