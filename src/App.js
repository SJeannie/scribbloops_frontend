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
    isloggedIn: false,
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
      .then(data => localStorage.setItem('token', data.jwt))

    if (localStorage.token) {
      this.setState({
        isloggedIn: true
      })

      fetch('http://localhost:3000/api/v1/profile', {

      })
    }

  }

  renderLogin = () => {
    return this.state.isloggedIn ? (
      <div><NavBar />
        <div className="divBox">
          <DraftEditor />
        </div>
        <Advisorslist />
      </div>) : (
        <div>
          <Login handleLogin={this.handleLogIn} />
        </div>)
  }


  render() {
    return (
      this.renderLogin()
    );
  }
}

export default App;
