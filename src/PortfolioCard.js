import React, { Component } from 'react';

export default class PortfolioCard extends Component {


  render() {
    return (
      <div className="" onClick={e => this.props.show(this.props.portfolio)}>
        <h3>
          {this.props.portfolio.name}
        </h3>
      </div>
    )
  }
}