import React, { Component } from 'react';

export default class DocumentCard extends Component {


  render() {
    // console.log(this.props.document)
    return (
      <div className="" onClick={e => this.props.handleClick(this.props.document)} >
        <h3>
          {this.props.document.title}
        </h3>
      </ div>
    )
  }
}