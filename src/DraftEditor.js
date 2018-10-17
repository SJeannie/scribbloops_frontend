import React, { Component } from 'react';
import TextEditor from './slate_components/TextEditor';
import Editor from 'draft-js-editor';
import { Warp_URL } from './constants';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import WarpCable from 'warp-cable-client';
const api = WarpCable(Warp_URL);

class DraftEditor extends Component {
  componentDidMount = () => {
    api.subscribe(
      'Documents',
      'show',
      { id: this.props.document.id },
      (document) => {
        console.log(document.content);
        if (this.state.isEditing) return;
        this.setState({
          isLoading: false,
          editorState: document.content
            ? EditorState.createWithContent(
                convertFromRaw(JSON.parse(document.content))
              )
            : EditorState.createEmpty()
        });
      }
    );
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  editDocument = (editorState) => {
    const contentState = editorState.getCurrentContent();
    clearTimeout(this.stopsEditing);
    this.setState({ isEditing: true, editorState: editorState });
    this.stopsEditing = setTimeout(
      () => this.setState({ isEditing: false }),
      1000
    );
    api.trigger('Documents', 'update', {
      id: this.props.document.id,
      content: JSON.stringify(convertToRaw(contentState))
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? '' : <TextEditor />}
        {/* Welcome Scribbloops Draft Editor
        {this.state.isLoading ? '' : <TextEditor />} */}
      </div>
    );
  }
}

export default DraftEditor;
