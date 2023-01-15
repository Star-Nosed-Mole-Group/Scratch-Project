import { Link } from 'react-router-dom'
import React from 'react'


class SignIn extends React.Component {
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
        // alert('Event is ' + event);
        
        alert('Make get request');
    }

    render () {

        return (
            <div className='SignInBox'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Sign in"/>
                </form>

            </div>
        )
    }
}

export default SignIn;
/**
 *     <Link to='/home'></Link>     is embedded in a div, button, list , etc
 */