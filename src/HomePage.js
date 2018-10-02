import React, { Component } from 'react';
import CurrentUser from './Currentuser'
import PortfolioList from './PortfolioList'
import DocumentList from './DocumentList'

class HomePage extends Component {

  
  render() {
    return (
      <div>
      <CurrentUser/>
      <PortfolioList/>
      <DocumentList/>
      </div>
    );
  }
}
export default HomePage;