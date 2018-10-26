import React, { Component } from 'react';
import CurrentUser from './CurrentUser';
import PortfolioList from './PortfolioList';

class HomePage extends Component {
  state = {
    portfolios: [],
    user: null
  };

  updatePortfolios = (data) => {
    this.setState((state) => {
      state.portfolios = data;
      return state;
    });
  };

  componentDidMount() {
    this.setUser();
  }

  setUser = () => {
    if (localStorage.user) {
      this.setState((state) => {
        state.user = this.retrieveObject();
        return state;
      });
    }
  };

  retrieveObject = () => {
    let userObject = localStorage.getItem('user');
    console.log('Getting user from localStorage :', userObject);
    return JSON.parse(userObject);
  };

  render() {
    console.log('Rendering ', this.state.user);
    return (
      <div>
        <CurrentUser user={this.state.user} />
        <PortfolioList
          portfolios={this.state.portfolios}
          handleReRender={this.props.handleReRender}
          updatePortfolios={this.updatePortfolios}
          returnToPortfolio={this.props.returnToPortfolio}
        />
        {/* <DocumentList /> */}
      </div>
    );
  }
}
export default HomePage;
