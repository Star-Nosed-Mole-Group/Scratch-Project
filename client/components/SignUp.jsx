import { Link } from 'react-router-dom'
import React from 'react'


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
        // alert('Event is ' + event);
        alert('Make post request');
    }

    render () {

        return (
            <div className='SignUpBox'>
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
                    <input type="submit" value="Sign up!"/>
                </form>

            </div>
        )
    }
}

export default Signup;