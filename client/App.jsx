import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import css from stylesheets
// import all components here
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import HomePage from './components/HomePage.jsx'
import Layout from './components/Layout.jsx'

function App() {
    return (
        <div>
        <Routes>
          <Route path='/' element={<Layout/>} />
          <Route index element={<SignIn />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes >
        {/* <SignUp /> */}
        </div>
    )
}

 
// sign in page
 //username
 //password
 //submit button
// sign up page
 //username
 //password
 //submit button
// homepage
// default state to 0 for every category
 //num for food, drinks, space, sound, outlets, parking, wifi
   //onChange(handleChange) for each category handleChange updates state
 //submit sends get request referencing state to backend
   //onSubmit (event)
 //
 


export default App;