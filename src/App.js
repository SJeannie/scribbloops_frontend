import React, { Component } from 'react';
import './App.css';
import DraftEditor from  './DraftEditor';
import NavBar from  './NavBar';
import Advisorslist from  './Advisorslist';
import Login from './login'
import HomePage from './HomePage'



class App extends Component {
 

    render() {

    return (
      <div>
      <NavBar/>
      {/* <HomePage/> */}
      <div className="divBox">
        <DraftEditor/>
      </div>
      <Advisorslist/>
      </div>
    );
  }
}

export default App;
