import React, { Component } from 'react';
import { Button, ListGroup, Grid, Row, Col } from 'react-bootstrap';
import { API_URL, Warp_URL } from './constants';
import DocumentList from './DocumentList';
import DocumentCard from './DocumentCard';
import WarpCable from 'warp-cable-client';
const api = WarpCable(`${Warp_URL}`);

export default class Portfolio extends Component {
  state = {
    documents: [],
    currentDocument: null,
    portfolio: {},
    user: null
  };

  componentDidMount = () => {
    //console.log('Portfolio: ' + this.props);
    this.getDocuments();
    this.getPortfolioObj();
    this.setUser();
  };

  setUser = () => {
    if (localStorage.user) {
      this.setState((state) => {
        state.user = this.retrieveObject();
        return state;
      });
    }
  };

  retrieveObject = () => {
    let userObject = localStorage.getItem('user');
    console.log('Getting user from localStorage :', userObject);
    return JSON.parse(userObject);
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
        <div className="userBox">
          <h2 className="userName">
            {this.state.user ? `${this.state.user.first_name}` : ''}
          </h2>
          <h4 className="userDocuments">
            {this.state.documents.length == 1
              ? `${this.state.documents.length} document`
              : `${this.state.documents.length} documents`}
          </h4>
        </div>

        <h1>{this.state.portfolio.name}</h1>

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
          <Grid>
            <Row className="form-input">
              <Col xs={6}>
                <input
                  type="text"
                  name="title"
                  placeholder="Name your new document..."
                />
              </Col>
              <Col xs={2}>
                <input className="newButton" type="submit" value="create" />
              </Col>
            </Row>
          </Grid>
        </form>

        {/* <ListGroup> */}
        <DocumentList
          documents={this.state.documents}
          destroySingleDocument={this.destroySingleDocument}
        />
        {/* </ListGroup> */}
      </div>
    );
  }
}
