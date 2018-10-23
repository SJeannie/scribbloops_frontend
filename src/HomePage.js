import React, { Component } from 'react';
import CurrentUser from './Currentuser';
import PortfolioList from './PortfolioList';

class HomePage extends Component {
  state = {
    portfolios: []
  };

  updatePortfolios = (data) => {
    this.setState((state) => {
      state.portfolios = data;
      return state;
    });
  };

  render() {
    // console.log(this.props.user)
    return (
      <div>
        <CurrentUser user={this.props.user} />
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
