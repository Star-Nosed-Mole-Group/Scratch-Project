import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import '../stylesheets/signin.css'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";



const SignIn = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    if (event.target.name == 'username') {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }
    
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const requestOptions = {
      // mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    };

    fetch('/api/user/login', requestOptions)
      .then(data => {
        if (!data.ok) {
          alert('Your username or password is incorrect');
          //throw Error('Your username or password is incorrect')
          navigate(0);
        } else {
          navigate('/home', {state:{username: username}});
        }
    })
    .catch(err => console.log(err));
    // alert('Make get request');
  } 

  return (
      <div className="login">
          <h1>Java-N-Script</h1>
              <div className="username">
                  <label htmlFor="username">Username</label><br></br>
                  <input placeholder='Enter your username' type="text" id="username" name="username" onChange={(e) => handleChange(e)}></input>
              </div>
              <div className="password">
                  <label htmlFor="password">Password</label><br></br>
                  <input placeholder='Enter your password' type="password" id="password" name="password" onChange={(e) => handleChange(e)}></input>
              </div><br></br>
          <div className="signin-btn-container">
              <button className='signin-btn'onClick={handleSubmit}>Sign in</button>
              <div>
                <Link to="/signup">
                  <button>Don't have an account?</button>
                </Link>
              </div>
          </div>
      </div>
  )
}


// class SignIn extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             username: "",
//             password: ""
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const target = event.target;
//         // alert(' Event is ' + event.target.)
//         const value = target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         })
//     }

//     // use this to log in -> username: hello  / password: beans
//     handleSubmit() {
//       const requestOptions = {
//         // mode: 'no-cors',
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(this.state)
//       };
//       const navigate = useNavigate();
//       fetch('http://localhost:3000/api/user/login', requestOptions)
//         .then(data => {
//             if (!data.ok) {
//                 alert('Your username or password is incorrect');
//                 navigate('/signin')
//             } else {
//                 navigate('/home')
//             }
//         })
//         .catch(err => console.log(err));
//         // alert('Make get request');
//     }

//     render () {

//         return (
//             <div className="login">
//                 <h1>Welcome to Coffee Shop</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="username">
//                         <label htmlFor="username">Username</label><br></br>
//                         <input placeholder='Enter your username' type="text" id="username" name="username" onChange={(e) => this.handleChange(e)}></input>
//                     </div>
//                     <div className="password">
//                         <label htmlFor="password">Password</label><br></br>
//                         <input placeholder='Enter your password' type="password" id="password" name="password" onChange={(e) => this.handleChange(e)}></input>
//                     </div><br></br>
//                     <div className="signin-btn">
//                         <input type="submit" value="Sign in"/>
//                     </div>
//                 </form>
//                 <div>
//                  <Link to="/signup">
//                     <button>Don't have an account?</button>
//                  </Link>
//                  <Link to="/home">
//                     <button>So we can still access home</button>
//                  </Link>
//                 </div>
//             </div>
//         )
//     }
// }

export default SignIn;
/**
 *     <Link to='/home'></Link>     is embedded in a div, button, list , etc
 */