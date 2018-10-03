import React, { Component } from 'react';
import PortfolioCard from './PortfolioCard'
import DocumentList from './DocumentList'

export default class PortfolioList extends Component {
  state = {
    newPortfolio: '',
    currentPortfolio: null
  }
  componentDidMount = () => {
    this.getPortfolios()
  }


  getPortfolios = () => {
    fetch('http://localhost:3000/portfolios', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      // .then(data => console.log(data))
      .then(data => this.props.updatePortfolios(data))
  }

  createPortfolio = (e) => {
    e.preventDefault()
    if (this.state.newPortfolio.length > 2) {
      fetch('http://localhost:3000/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ portfolio: { name: this.state.newPortfolio } })
      })
        .then(resp => resp.json())
        .then(crap => this.getPortfolios(crap))
    }
  }

  handleRenderSinglePortfolio = () => (
    this.state.currentPortfolio ? <DocumentList /> : this.putPortfolioCards()
  )

  handleSinglePortfolio = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio
    })
  }



  handleNewName = (e) => {
    let name = e.target.value
    this.setState({
      newPortfolio: name
    })
  }


  putPortfolioCards = () => (
    this.props.portfolios.length > 0 ? this.props.portfolios.map(portfolio => (
      <PortfolioCard key={portfolio.id} portfolio={portfolio} show={this.handleSinglePortfolio} />
    )) : ''
  )

  render() {
    return (
      <div className="portfolioListBox">

        <form onSubmit={e => this.createPortfolio(e)} onChange={this.handleNewName}>
          <input type="text" name="newPortfolio" placeholder="NewPortfolio">
          </input>
          <button className="newButton">
            New Portfolio
          </button>
        </form>
        <br />
        {/* <h2>PortfolioList</h2> */}
        {this.handleRenderSinglePortfolio()}
      </div>
    )
  }
}