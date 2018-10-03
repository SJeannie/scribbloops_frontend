
import React, { Component } from 'react';
import DraftEditor from './DraftEditor';
import DocumentCard from './DocumentCard'
import WarpCable from 'warp-cable-client'
const api = WarpCable()


export default class HomePage extends Component {

  state = {
    documents: [],
    currentDocument: null
  };

  componentDidMount = () => {
    console.log(this.props)
    this.getDocuments()
  }
  getDocuments = () => {
    fetch(`http://localhost:3000/portfolios/${this.props.currentPortfolio.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => this.setState({ documents: data.documents }))
  }

  putDocuments = () => {

    return this.state.documents.length >= 1 ? this.state.documents.map(document => {
      return <DocumentCard key={document.id} handleClick={this.handleCurrentDocument} document={document} />
    }) : ''
  }

  handleCurrentDocument = (document) => (
    this.setState({
      currentDocument: document
    })
  )






  render() {
    console.log(this.state.documents)
    return (
      this.state.currentDocument ? <DraftEditor document={this.state.currentDocument} />
        : (
          <div>
            <form onSubmit={e => {
              e.preventDefault()
              api.trigger('Documents', 'create', { title: e.target.title.value, portfolio_id: this.props.currentPortfolio.id })
            }}>
              <input name="title" placeholder="document name" />
              <button></button>
            </form>
            <button onClick={this.props.returnToPortfolioList}>Return</button>
            {this.state.currentDocument ? '' : <h2>{this.props.currentPortfolio.name}</h2>}
            {this.putDocuments()}
          </div>
        )
    )
  }
}