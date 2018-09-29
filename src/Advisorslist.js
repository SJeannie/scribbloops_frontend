import React, { Component } from 'react';
import UserCard from './UserCard'
import './Advisorslist.css';

class Advisorslist extends React.Component {

  state = {};

  render() {
    return( 
    <div class="usersBox">
      <UserCard/>
    </div>
    )
  }
}

export default Advisorslist;
