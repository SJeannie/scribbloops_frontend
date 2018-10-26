import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
export default class PortfolioCard extends Component {
  render() {
    // console.log('here')
    return (
      <div>
        <div className="portfolio-card">
          <ListGroupItem>
            <Row className="list-row">
              <Col xs={6}>
                <Link
                  style={{ fontSize: 22 }}
                  to={`/portfolio/${this.props.portfolio.id}`}>
                  {this.props.portfolio.name}
                </Link>
              </Col>
              <Col xs={2} xsOffset={4}>
                <Button
                  onClick={(e) =>
                    this.props.deleteButton(this.props.portfolio)
                  }>
                  delete
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        </div>

        {/* <div onClick={(e) => this.props.show(this.props.portfolio)}>
          <h3>{this.props.portfolio.name}</h3>
        </div> */}
      </div>
    );
  }
}
