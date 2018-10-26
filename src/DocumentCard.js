import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DocumentCard extends Component {
  render() {
    // console.log(this.props.document)
    return (
      <div className="document-link">
        <Link
          style={{ fontSize: 22 }}
          to={`/document/${this.props.document.id}`}>
          {this.props.document.title}
        </Link>
      </div>
    );
  }
}
