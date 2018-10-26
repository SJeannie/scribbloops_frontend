import React, { Component } from 'react';
import DocumentCard from './DocumentCard';
import { Button, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';

export default class DocumentList extends Component {
  render() {
    return this.props.documents.map((document) => {
      return (
        <div>
          <ListGroupItem style={{ height: '51px' }}>
            {/* <Grid> */}
            <Row className="list-row">
              <Col xs={8}>
                <DocumentCard key={document.id} document={document} />
              </Col>
              <Col xs={2} xsOffset={2}>
                <Button
                  onClick={(e) => this.props.destroySingleDocument(e, document)}
                  document={document}>
                  Delete
                </Button>
              </Col>
            </Row>
            {/* </Grid> */}
          </ListGroupItem>
        </div>
      );
    });
  }
}
