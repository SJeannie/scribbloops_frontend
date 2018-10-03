import React, { Component } from 'react';
import './NavBar.css';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import PortfolioList from './PortfolioList'
import HomePage from './HomePage'
class NavBar extends React.Component {

  state = {};

  // handleLogout = () => {
  //   this.props.handleLogout
  // }

  render() {
    return (
      <div className="topnav">
        <a className="active" href="#home">Home</a>
        <NavLink to='/homePage'>Portfolio</NavLink>
        <a href="#navbar opt2">Document</a>
        <a href="#navbar opt3">Advisors</a>
        <button onClick={this.props.handleLogout}>Logout</button>


        <Switch>
          <Route path="/homePage" component={HomePage} />
        </Switch>
      </div>
    )
  }
}

export default NavBar;
