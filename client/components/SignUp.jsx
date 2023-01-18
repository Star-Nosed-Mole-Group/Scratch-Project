import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../stylesheets/signin.css'
import { Navigate, useNavigate} from "react-router-dom";

const Signup = props => {
    const [ username , SetUsername ] = useState('');
    const [ password , SetPassword ] = useState('');
    const [ passwordType, setPasswordType ] = useState('password');
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            // mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password})
    };

        // alert('Username: ' + username + ' Password: ' + password)
        //const request = new Request ('http://localhost:3000/api/user/signup')
    fetch('/api/user/signup', requestOptions)
      .then(response => {
        console.log(response);
        response.json();
        // alert('resonse status is: ' + response.status)
        if (!response.ok) {
            alert('Signup unsuccessful!');
         //   navigate(0);
          } else {
            alert('You have successfully signed up!');
            navigate('/home', {state:{username: username}});
          }

      })
      .catch(err => console.log(err));      
    }
    //style={{backgroundImage:'url("https://www.pngfind.com/pngs/m/268-2683291_png-file-svg-hide-password-icon-png-transparent.png")',height:30, width: 30}}
        return (
            <div className='login'>
                <h1>Java-N-Script</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                    </label><br></br>
                        <input type="text" name="username" value={username} placeholder='Enter username' onChange={(e) => SetUsername(e.target.value)}/><br></br>
                    <label>
                        Password:
                    </label><br></br>
                    <div style={{textAlign:'center' }}>
                        <input type={passwordType} name="password" value={password} placeholder='Enter password' onChange={(e) => SetPassword(e.target.value)}/>
                        <span id="toggleIcon" onClick={() => {passwordType === 'text' ? setPasswordType('password') : setPasswordType('text')}} >
                            {passwordType === 'password' ? <img src="public/closeeye.png" style={{width:'1.2em', height:'1.2em'}}/> : <img src="public/openeye.png" style={{width:'1.2em', height:'1.2em'}}/>}
                        </span>
                    </div>
                    <br></br>
                    <input type="submit" value="Sign up!"/>
                </form>
              <div>
                <br/>
                  <Link to="/">
                     <button className='haveanaccount'>Already have an account?</button>
                  </Link>
              </div>
            </div>
        )
}

export default Signup;