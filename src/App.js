import React, { Component } from 'react';
import './App.css';
import DraftEditor from  './DraftEditor';
import NavBar from  './NavBar';
import Advisorslist from  './Advisorslist';


class App extends Component {
  render() {
    return (
      <body>
      
      <NavBar/>
      <div className="divBox">
        <DraftEditor/>
      </div>
      <Advisorslist/>
      </body>
    );
  }
}

export default App;
