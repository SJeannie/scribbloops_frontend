import React, { Component } from 'react';
import PortfolioCard from './PortfolioCard';
import DocumentList from './DocumentList';
import { API_URL } from './constants';

export default class PortfolioList extends Component {
  state = {
    newPortfolio: '',
    currentPortfolio: null
  };
  componentDidMount = () => {
    this.getPortfolios();
  };

  getPortfolios = () => {
    fetch(`http://${API_URL}/portfolios`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then((resp) => resp.json())
      // .then(data => console.log(data))
      .then((data) => this.props.updatePortfolios(data));
  };

  createPortfolio = (e) => {
    e.preventDefault();
    if (this.state.newPortfolio.length > 2) {
      fetch(`http://${API_URL}/portfolios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `Bearer ${localStorage.token}`
        },
        // body: { portfolio: { name: this.state.newPortfolio } }
        body: JSON.stringify({ portfolio: { name: this.state.newPortfolio } })
      })
        .then((resp) => resp.json())
        .then((portfolio_material) => this.getPortfolios(portfolio_material));
    }
  };

  handleRenderSinglePortfolio = () =>
    this.state.currentPortfolio ? (
      <DocumentList
        returnToPortfolioList={this.resetCurrentPortfolio}
        currentPortfolio={this.state.currentPortfolio}
      />
    ) : (
      this.putPortfolioCards()
    );

  handleSinglePortfolio = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio
    });
  };

  handleBackButton = () => {};

  handleNewName = (e) => {
    let name = e.target.value;
    this.setState({
      newPortfolio: name
    });
  };

  resetCurrentPortfolio = () => {
    this.setState({
      currentPortfolio: null
    });
  };

  putPortfolioCreateForm = () =>
    !this.state.currentPortfolio ? (
      <form
        onSubmit={(e) => this.createPortfolio(e)}
        onChange={this.handleNewName}>
        <input
          type="text"
          name="newPortfolio"
          placeholder="Type a new portfolio name here..."
        />
        <button className="newButton">Create</button>
      </form>
    ) : (
      ''
    );

  putPortfolioCards = () =>
    this.props.portfolios.length > 0
      ? this.props.portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            show={this.handleSinglePortfolio}
          />
        ))
      : '';

  render() {
    return (
      <div className="portfolioListBox">
        {this.putPortfolioCreateForm()}
        <br />
        {/* <h2>PortfolioList</h2> */}
        {this.handleRenderSinglePortfolio()}
      </div>
    );
  }
}
