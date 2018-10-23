import React, { Component } from 'react';
import DocumentCard from './DocumentCard';

export default class DocumentList extends Component {
  render() {
    return this.props.documents.map((document) => {
      return (
        <div>
          <DocumentCard key={document.id} document={document} />
          <button
            onClick={(e) => this.props.destroySingleDocument(e, document)}
            document={document}>
            Delete
          </button>
        </div>
      );
    });
  }
}
