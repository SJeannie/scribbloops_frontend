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
    reRender: false,
    user: null
  }

  componentDidMount = () => {
    if (localStorage.user) {
      this.setState(state => {
        state.user = this.retrieveObject()
        return state
      })

    }
  }

  handleLogIn = (loginState) => {
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
      .then(data => {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt)
          this.handleGetProfile()
        }
      })
  }

  handleGetProfile = () => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => {

        localStorage.setItem('user', JSON.stringify(data.user))
        this.setState(state => {
          state.user = data.user
          return state
        })
      })

    this.handleReRender()
  }

  handleLogout = () => {
    localStorage.clear()
    this.handleReRender()
  }

  handleReRender = () => {
    this.setState(state => {
      state.reRender = !this.state.reRender
      return state
    })
  }

  retrieveObject = () => {
    let userObject = localStorage.getItem('user')
    // console.log(userObject)
    return JSON.parse(userObject)
  }

  render() {
    return (
      this.renderLogin()
    );
  }

  renderLogin = () => {
    return localStorage.token ? (
      <div>
        <NavBar handleLogout={this.handleLogout} />
        <HomePage user={this.state.user} handleReRender={this.handleReRender}/>
      </div>
    ) : (
        <div>
          <Login handleLogin={this.handleLogIn} />
        </div>)
  }
}
export default App;