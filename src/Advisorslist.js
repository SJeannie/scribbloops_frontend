import React, { Component } from 'react';
import UserCard from './UserCard'
import './Advisorslist.css';

class Advisorslist extends React.Component {

  state = {};

  render() {
    return( 
    <div className="usersBox">
      <UserCard/>
    </div>
    )
  }
}

export default Advisorslist;
