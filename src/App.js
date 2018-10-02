import React, { Component } from 'react';
import './App.css';
import DraftEditor from './DraftEditor';
import NavBar from './NavBar';
import Advisorslist from './Advisorslist';
import Login from './login'
import HomePage from './HomePage'

import WarpCable from 'warp-cable-client'

window.WarpCable = WarpCable

class App extends Component {
  state = {
    user: null
  }

  handleLogIn = (loginState) => {
    // debugger
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      body: JSON.stringify({
        user: loginState
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      // .then(data => console.log(data.jwt))
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt)
          this.handleProfile()
        }
      })
  }

  handleProfile = () => {

    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => this.setState(state => {
        // console.log(data)
        state.user = data.user
        // state.isloggedIn = true
        return state
      }))
  }



  renderLogin = () => {
    // console.log(this.state.user)
    return localStorage.token ? (
      <div>
        <NavBar handleLogout={this.handleLogout} />
        <HomePage user={this.state.user} />
      </div>
    ) : (
        <div>
          <Login handleLogin={this.handleLogIn} />
        </div>)
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState(state => {
      // state.isloggedIn = false
      state.user = null
      return state
    })
  }


  render() {
    return (
      this.renderLogin()
    );
  }
}

export default App;
