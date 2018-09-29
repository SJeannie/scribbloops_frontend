import React, { Component } from 'react';
import './Advisorslist.css';
import jeanniePic from './jeanniePic.jpg';

class UserCard extends React.Component {

  state = {};

  render() {
    return <div class="userCard">
    <img class="smallImage" src={jeanniePic}></img>
    <div class="userName">
    UserName
    </div> 
    <button>Invite</button>
    </div>
  }
}

export default UserCard;
