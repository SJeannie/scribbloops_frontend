import React, { Component } from 'react';
import PortfolioCard from './PortfolioCard'

export default class PortfolioList extends Component {


  render() {
    return (
      <div className="portfolioListBox">

        <form>
          <input type="text" placeholder="NewPortfolio">
          </input>
          <button className="newButton">
            New Portfolio
          </button>
        </form>
        <br />
        PortfolioList
        <PortfolioCard />

      </div>
    )
  }
}