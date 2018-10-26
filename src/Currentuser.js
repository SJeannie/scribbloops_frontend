import React, { Component } from 'react';
import './CurrentUser.css';
// import jeanniePic from './jeanniePic.jpg';
// <img className="largeImage" src={jeanniePic} />

export default class CurrentUser extends Component {
  render() {
    // this.props.user coming from HomePage.state
    return (
      <div className="userBox">
        <h2 className="userName">
          {this.props.user ? `${this.props.user.first_name}` : ''}
          {/* {this.props.user.portfolios
            ? `${this.props.user.portfolios.length}`
            : ''} */}
        </h2>
      </div>
    );
  }
}
