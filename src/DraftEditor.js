import React, { Component } from 'react';
// import Editor from 'draft-js-editor'
import { EditorState, Editor, convertToRaw } from 'draft-js';



// const contentState = convertFromRaw(rawContent)
// const editorState = EditorState.createWithContent(contentState)


class DraftEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({
      editorState,
    });
  }

  render() {
    return <div>
     Welcome Scribbloops Draft Editor
      <Editor
        onChange={(editorState) => this.setState({ editorState })}
        editorState={this.state.editorState}
      />
    </div>
  }
}

export default DraftEditor;
