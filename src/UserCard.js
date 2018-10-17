import React, { Component } from 'react';
import './Advisorslist.css';
import jeanniePic from './jeanniePic.jpg';

class UserCard extends React.Component {
  state = {};

  render() {
    return (
      <div className="userCard">
        <img className="smallImage" src={jeanniePic} />
        <div className="userName">UserName</div>
        <button>Invite</button>
      </div>
    );
  }
}

export default UserCard;
