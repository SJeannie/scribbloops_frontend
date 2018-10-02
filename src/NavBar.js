import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends React.Component {

  state = {};

  render() {
    return(
       <div className="topnav">
    <a className="active" href="#home">Home</a>
    <a href="#navbar opt1">Portfolio</a>
    <a href="#navbar opt2">Document</a>
    <a href="#navbar opt3">Advisors</a>
    
    </div>
    )
  }
}

export default NavBar;
