import React, { Component } from 'react';

export default class PortfolioCard extends Component {


  render() {
    return (
      <div className="">
        <h3>
          {this.props.portfolio.name}
        </h3>
      </div>
    )
  }
}