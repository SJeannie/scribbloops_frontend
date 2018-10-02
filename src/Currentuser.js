import React, { Component } from 'react';
import './CurrentUser.css'
import jeanniePic from './jeanniePic.jpg';

export default class CurrentUser extends Component {



  render() {
    // let user = this.props.user
    // console.log(user.first_name)
    return (
      <div className="userBox">
        <img className="largeImage" src={jeanniePic} />
        <h2 className="userName">
          {/* {this.props.user.first_name} */}

        </h2>
      </div>
    )
  }
}