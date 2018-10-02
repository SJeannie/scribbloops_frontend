import React, { Component } from 'react';
import './CurrentUser.css'
import jeanniePic from './jeanniePic.jpg';

export default class CurrentUser extends Component {


  
  render() {
    return (
      <div className="userBox">
        <img className="largeImage" src={jeanniePic}/>
        <h2 className="userName">
            CurrentUser
        </h2>
      </div>
    )
  }
}