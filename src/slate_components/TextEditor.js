import React, { Component } from 'react';
import { Editor } from 'slate-react';
// import { change } from 'slate-react';
import { Value } from 'slate'; // import value object from Slate
import { Warp_URL } from './constants';
import Icon from 'react-icons-kit';

import { feather } from 'react-icons-kit/feather/feather';

import { moreVertical } from 'react-icons-kit/feather/moreVertical';

import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';

import { alignLeft } from 'react-icons-kit/feather/alignLeft';
import { alignCenter } from 'react-icons-kit/feather/alignCenter';
import { alignRight } from 'react-icons-kit/feather/alignRight';
import { alignJustify } from 'react-icons-kit/feather/alignJustify';

import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';

import { BoldMark, ItalicMark, FormatToolbar } from './index';
import _ from 'lodash';
import WarpCable from 'warp-cable-client';
const api = WarpCable(Warp_URL);

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: ''
              }
            ]
          }
        ]
      }
    ]
  }
});

// <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults = {false} /> // lodash method _.debounce()

export default class TextEditor extends Component {
  //Pass the initial value from the Slate editor to the state.
  state = {
    value: initialValue,
    alignment: 'alignLeft',
    userID: null,
    ownerID: null,
    isTyping: false,
    isLoading: true // added from DraftEditor
  };

  // componentDidMount added from DraftEditor; where is isEditing coming from? Or
  // componentDidMount = () => {
  //   api.subscribe(
  //     'Documents',
  //     'show',
  //     { id: this.props.document.id },
  //     (document) => {
  //       console.log(document.content);
  //       if (this.state.isEditing) return;
  //       this.setState({
  //         isLoading: false,
  //         editorState: document.content
  //           ? EditorState.createWithContent(
  //               convertFromRaw(JSON.parse(document.content))
  //             )
  //           : EditorState.createEmpty()
  //       });
  //     }
  //   );
  // };

  onChange = ({ value }) => {
    this.setState({ value }, () => {
      // persist on backend
    });
  };

  onKeyDown = (e, change, next) => {
    console.log(e.key);

    if (!e.ctrlKey) {
      return next();
    }
    e.preventDefault();

    switch (e.key) {
      case 'b': {
        change.toggleMark('bold'); // Now create BoldMark.js; toggleMark sets the <props className="mark type"></props>
        return true;
      }
      case 'i': {
        change.toggleMark('italic');
        return true;
      }
      case 'u': {
        change.toggleMark('underline');
        return true;
      }
      default:
    }
  };

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />; // importing the component
      case 'underline':
        return <u {...props.attributes}>{props.children}</u>; // inline
      case 'code':
        return <code {...props.attributes}>{props.children}</code>;
      case 'list':
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );
      default:
    }
  };

  ref = (editor) => {
    this.editor = editor;
  };

  onMarkClick = (e, type) => {
    e.preventDefault();
    // const { value } = this.state;
    // this.onChange(change);
    // - up to here is what used to be possible pre-Oct 9, 2018.
    // Editor now is changed implicitly via onChange (and rerenders immediately).
    // Other attempts include:
    // let change = this.editor.change((change) => change.toggleMark(type));
    // change = change.toggleMark(type);
    // const change = this.state.value.change((change) => change.toggleMark(type));
    // this.state.value = editor
    // this.editor.change((change) => change.toggleMark(type).value);
    this.editor.change((change) => change.toggleMark(type));
    //Apply the formatting on the selected text (change) with the desired format; then call an update on the component to display the newly made changes.
  };

  onAlignmentChange = (e, alignment) => {
    // e.preventDefault();
    this.setState({ alignment });
  };

  onToggleCurrentWriter = () => {
    // this.setState({ isTyping: !this.state.isTyping });

    // const { isTyping } = this.state
    // this.setState({ isTyping: !isTyping })

    const isTyping = !this.state.isTyping;
    this.setState({ isTyping });
  };

  render() {
    return (
      <div>
        <div>
          <FormatToolbar>
            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onToggleCurrentWriter(e, 'feather')}>
              <Icon icon={feather} />
            </button>

            <button className="tooltip-icon-button" disabled="true">
              <Icon icon={moreVertical} />
            </button>

            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onMarkClick(e, 'bold')}>
              <Icon icon={bold} />
            </button>
            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onMarkClick(e, 'italic')}>
              <Icon icon={italic} />
            </button>

            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onMarkClick(e, 'underline')}>
              <Icon icon={underline} />
            </button>

            <button className="tooltip-icon-button" disabled="true">
              <Icon icon={moreVertical} />
            </button>

            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onAlignmentChange(e, 'left')}>
              <Icon icon={alignLeft} />
            </button>
            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onAlignmentChange(e, 'center')}>
              <Icon icon={alignCenter} />
            </button>
            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onAlignmentChange(e, 'right')}>
              <Icon icon={alignRight} />
            </button>
            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onAlignmentChange(e, 'justify')}>
              <Icon icon={alignJustify} />
            </button>

            <button className="tooltip-icon-button" disabled="true">
              <Icon icon={moreVertical} />
            </button>

            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onMarkClick(e, 'list')}>
              <Icon icon={list} />
            </button>

            <button
              className="tooltip-icon-button"
              onPointerDown={(e) => this.onMarkClick(e, 'code')}>
              <Icon icon={code} />
            </button>
          </FormatToolbar>
        </div>

        <h1 className="screentitle">keep scribbling... and scribbling...</h1>

        <div style={{ textAlign: this.state.alignment }}>
          <Editor
            ref={this.ref} // ref ~ document.querySelector(); React finds ref() and automatically calls the function associated with it inside render()
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
          />
        </div>
      </div>
    );
  }
}
