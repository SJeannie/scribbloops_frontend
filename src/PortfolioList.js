import React, { Component } from 'react';
import {
  Button,
  Jumbotron,
  ButtonGroup,
  ButtonToolbar,
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import PortfolioCard from './PortfolioCard';
import DocumentList from './DocumentList';
import { API_URL, Warp_URL } from './constants';
import WarpCable from 'warp-cable-client';
const api = WarpCable(Warp_URL);

export default class PortfolioList extends Component {
  state = {
    newPortfolio: '',
    currentPortfolio: null
  };
  componentDidMount = () => {
    this.getPortfolios();
  };

  getPortfolios = () => {
    api.subscribe(
      'Portfolios',
      'index',
      {
        authorization: `Bearer ${localStorage.token}`
      },
      (data) => {
        this.props.updatePortfolios(data);
      }
    );

    // fetch(`http://${API_URL}/portfolios`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.token}`
    //   }
    // })
    //   .then((resp) => resp.json())
    //   // .then(data => console.log(data))
    //   .then((data) => this.props.updatePortfolios(data));
  };

  createPortfolio = (e) => {
    e.preventDefault();
    if (this.state.newPortfolio.length > 0) {
      api.trigger('Portfolios', 'create', {
        portfolio: { name: this.state.newPortfolio },
        authorization: `Bearer ${localStorage.token}`
      });

      // fetch(`http://${API_URL}/portfolios`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'Application/JSON',
      //     Authorization: `Bearer ${localStorage.token}`
      //   },
      //   // body: { portfolio: { name: this.state.newPortfolio } }
      //   body: JSON.stringify({ portfolio: { name: this.state.newPortfolio } })
      // })
      //   .then((resp) => resp.json())
      //   .then((portfolio_material) => this.getPortfolios(portfolio_material));
    }
  };

  handleRenderSinglePortfolio = () =>
    this.state.currentPortfolio ? (
      <DocumentList
        returnToPortfolioList={this.resetCurrentPortfolio}
        currentPortfolio={this.state.currentPortfolio}
      />
    ) : (
      <ListGroup>{this.putPortfolioCards()}</ListGroup>
    );

  handleSinglePortfolio = (portfolio) => {
    this.setState({
      currentPortfolio: portfolio
    });
  };

  // check this:
  destroySinglePortfolio = (portfolio) => {
    api.trigger(
      'Portfolios',
      'destroy',
      { id: portfolio.id },
      // { id: this.props.match.params.id },
      (portfolios) => {
        console.log(portfolios);
        this.setState({ portfolios });
      }
    );
  };

  // handleBackButton = () => {};

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
        <Grid>
          <Row className="form-input">
            <Col xs={6} md={6}>
              <input
                type="text"
                name="newPortfolio"
                placeholder="Name your new portfolio..."
              />
            </Col>
            <Col xs={2}>
              <button className="newButton">create</button>
            </Col>
          </Row>
        </Grid>
      </form>
    ) : (
      ''
    );

  putPortfolioCards = () =>
    this.props.portfolios.length > 0
      ? this.props.portfolios.map((portfolio) => (
          <div>
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              show={this.handleSinglePortfolio}
              deleteButton={() => this.destroySinglePortfolio(portfolio)}
            />
            {/* <button
              onClick={(e) => this.destroySinglePortfolio(portfolio)}
              portfolio={portfolio}>
              delete
            </button> */}
          </div>
        ))
      : '';

  render() {
    console.log(this.props.portfolios);
    return (
      <div className="portfolioListBox">
        <h1>Public Portfolios</h1>
        {this.putPortfolioCreateForm()}
        <br />
        {/* <h2>PortfolioList</h2> */}
        {this.handleRenderSinglePortfolio()}
      </div>
    );
  }
}
