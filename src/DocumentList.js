import React, { Component } from 'react';
import { API_URL } from './constants';
import { Warp_URL } from './constants';
import DraftEditor from './DraftEditor';
import DocumentCard from './DocumentCard';
import TextEditor from './slate_components/TextEditor';
import WarpCable from 'warp-cable-client';
const api = WarpCable(`${Warp_URL}`);

export default class HomePage extends Component {
  state = {
    documents: [],
    currentDocument: null
  };

  componentDidMount = () => {
    //console.log('Document List: ' + this.props);
    this.getDocuments();
  };
  getDocuments = () => {
    api.subscribe(
      'Documents',
      'index',
      { portfolio_id: this.props.currentPortfolio.id },
      (documents) => {
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

  putDocuments = () => {
    return this.state.documents.length >= 1
      ? this.state.documents.map((document) => {
          return (
            <DocumentCard
              key={document.id}
              handleClick={this.handleCurrentDocument}
              document={document}
            />
          );
        })
      : '';
  };

  handleCurrentDocument = (document) =>
    this.setState({
      currentDocument: document
    });

  render() {
    //console.log(this.state.documents);
    return this.state.currentDocument ? (
      // <DraftEditor document={this.state.currentDocument} />
      <TextEditor document={this.state.currentDocument} />
    ) : (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            api.trigger('Documents', 'create', {
              title: e.target.title.value,
              portfolio_id: this.props.currentPortfolio.id
            });
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
        <button onClick={this.props.returnToPortfolioList}>
          Return to list
        </button>
        {this.state.currentDocument ? (
          ''
        ) : (
          <h2>{this.props.currentPortfolio.name}</h2>
        )}
        {this.putDocuments()}
      </div>
    );
  }
}
