import React, { Component } from 'react';
import './App.css'; ``


class LogIn extends Component {
  state = {
    username: '',
    password: ''
  }


  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    this.setState(state => {
      state[name] = value
      return state
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.handleLogin(this.state)
  }


  render() {
    return (

      <div className="signInBox">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <br />
          <input name="username" type="text" placeholder="Username" >
          </input>
          <br />
          <br />
          <input name="password" type="text"
            placeholder="Password">
          </input>
          <input type="submit" className="signInButton"
            placeholder="Login">

          </input>
        </form>

        <div>
          <br />
          {/* <h2>Not a user? </h2> */}
          <button className="signUpButton">
            Sign up now!
         </button>
        </div>
      </div>

    );
  }
}

export default LogIn;
