import React, { Component } from 'react';
import Editor from 'draft-js-editor'
import { EditorState, convertFromRaw } from 'draft-js'


// const contentState = convertFromRaw(rawContent)
// const editorState = EditorState.createWithContent(contentState)


class DraftEditor extends React.Component {

  state = {};

  render() {
    return <div>
     Scribbloops Draft Editor
      <Editor 
        onChange={(editorState) => this.setState({ editorState })}
        editorState={this.state.editorState}
      />
    </div>
  }
}

export default DraftEditor;
