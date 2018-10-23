import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioCard extends Component {
  render() {
    // console.log('here')
    return (
      <div className="portfolio-card">
        <Link to={`/portfolio/${this.props.portfolio.id}`}>
          {this.props.portfolio.name}
        </Link>
      </div>

      // <div className="" onClick={e => this.props.show(this.props.portfolio)}>
      //   <h3>
      //     {this.props.portfolio.name}
      //   </h3>
      // </div>
    );
  }
}
