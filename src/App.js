import React, { Component } from 'react';
import { API_URL } from './constants';
import { Warp_URL } from './constants';
import './NavBar.css';
import './App.css';
import NavBar from './NavBar';
import Advisorslist from './Advisorslist';
import Login from './login';
import HomePage from './HomePage';
import Portfolio from './Portfolio';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import WarpCable from 'warp-cable-client';
import TextEditor from './slate_components/TextEditor';

window.WarpCable = WarpCable;

class App extends Component {
  state = {
    reRender: false,
    user: null
  };

  componentDidMount = () => {
    if (localStorage.user) {
      this.setState((state) => {
        state.user = this.retrieveObject();
        return state;
      });
    }
  };

  handleLogIn = (loginState) => {
    fetch(`http://${API_URL}/api/v1/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: loginState
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          this.handleGetProfile();
        }
      });
  };

  handleGetProfile = () => {
    fetch(`http://${API_URL}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        this.setState((state) => {
          state.user = data.user;
          return state;
        });
      });

    this.handleReRender();
  };

  handleLogout = () => {
    console.log('logged out');
    localStorage.clear();
    this.handleReRender();
  };

  handleReRender = () => {
    this.setState((state) => {
      state.reRender = !this.state.reRender;
      return state;
    });
  };

  retrieveObject = () => {
    let userObject = localStorage.getItem('user');
    // console.log(userObject)
    return JSON.parse(userObject);
  };

  render() {
    return this.renderLogin();
  }

  returnToPortfolioList = (childFunction) => {
    childFunction();
  };

  renderLogin = () => {
    return localStorage.token ? (
      <div className="container">
        <div>
          <div className="topnav active">
            <a activeClassName="active" href="#home">
              Home
            </a>
            <NavBar handleLogout={this.handleLogout} />
            {/* <NavLink to="/homePage" activeClassName="active">
              Portfolio
            </NavLink> */}
            {/* <a href="#navbar opt2">Document</a>
            <a href="#navbar opt3">Advisors</a> */}
            {/* <a
              activeClassName="active"
              href="#login"
              onClick={this.handleLogout}>
              Logout
            </a> */}
            {/* <button onClick={this.handleLogout}>Logout</button> */}
          </div>
          <Switch>
            <Route path="/homePage/" component={HomePage} />
            <Route path="/document/:id" component={TextEditor} />
            <Route path="/portfolio/:portfolioId" component={Portfolio} />
          </Switch>
        </div>

        {/* <NavBar handleLogout={this.handleLogout} /> */}
        {/* <HomePage user={this.state.user} handleReRender={this.handleReRender} returnToPortfolio={this.returnToPortfolioList} /> */}
      </div>
    ) : (
      <div>
        <Login handleLogin={this.handleLogIn} />
      </div>
    );
  };
}
export default App;
