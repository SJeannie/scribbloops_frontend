import React, { Component } from 'react';
import { API_URL, Warp_URL } from './constants';
import DocumentList from './DocumentList';
import DocumentCard from './DocumentCard';
import WarpCable from 'warp-cable-client';
const api = WarpCable(`${Warp_URL}`);

export default class Portfolio extends Component {
  state = {
    documents: [],
    currentDocument: null,
    portfolio: {}
  };

  componentDidMount = () => {
    //console.log('Portfolio: ' + this.props);
    this.getDocuments();
    this.getPortfolioObj();
  };

  getPortfolioObj = (portfolioId) => {
    api.subscribe(
      'Portfolios',
      'show',
      { id: this.props.match.params.portfolioId },
      (portfolio) => {
        this.setState({ portfolio });
      }
    );
  };

  // check this:
  destroySingleDocument = (e, document) => {
    e.preventDefault();
    console.log('destroySingleDocument(): ', document);
    api.trigger('Documents', 'destroy', { id: document.id });
  };

  getDocuments = () => {
    api.subscribe(
      'Documents',
      'index',
      { portfolio_id: this.props.match.params.portfolioId },
      (documents) => {
        console.log('getDocuments(): ', documents);
        this.setState({ documents });
      }
    );
  };
  // subscribe, not fetch:
  //   fetch(`http://${API_URL}/portfolios/${this.props.currentPortfolio.id}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.token}`
  //     }
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => this.setState({ documents: data.documents }));
  // };

  // handleCurrentDocument = (document) =>
  //   this.setState({
  //     currentDocument: document
  //   }); <-- refactored; now route includes document.id

  render() {
    //console.log(this.state.documents);
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let newDocName = e.target.title.value;
            if (newDocName.length > 0) {
              api.trigger('Documents', 'create', {
                title: e.target.title.value,
                portfolio_id: this.props.match.params.portfolioId
              });
            }
            // let newDoc = {
            //   title: e.target.title.value,
            //   portfolio_id: this.props.currentPortfolio.id
            // };
            // this.setState({
            //   documents: [...this.state.documents, newDoc]
            // });
          }}>
          <input name="title" placeholder="document name" />
          <button>create document</button>
        </form>
        <h2>{this.state.portfolio.name}</h2>
        <DocumentList
          documents={this.state.documents}
          destroySingleDocument={this.destroySingleDocument}
        />
      </div>
    );
  }
}
