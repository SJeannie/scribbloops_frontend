import React, { Component } from 'react';
import { Editor } from 'slate-react';
// import { change } from 'slate-react';
import { Value } from 'slate'; // import value object from Slate
import { Warp_URL } from '../constants';
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

let iAmTypingTimer, someoneElseIsTypingTimer;

// import InsertImages from 'slate-drop-or-paste-images';
// import CollapseOnEscape from 'slate-collapse-on-escape';
// import MarkHotkeys from 'slate-mark-hotkeys';
// import PasteLinkify from 'slate-paste-linkify';
// import SoftBreak from 'slate-soft-break';
// import { Editor } from 'slate-react';

// // Add the plugin to your set of plugins...
// const plugins = [
//   InsertImages({
//     extensions: ['png'],
//     insertImage: (transform, file) => {
//       return transform.insertBlock({
//         type: 'image',
//         isVoid: true,
//         data: { file }
//       });
//     },
//     CollapseOnEscape: CollapseOnEscape(),
//     MarkHotkeys: MarkHotkeys(),
//     PasteLinkify: PasteLinkify(),
//     SoftBreak: SoftBreak()
//   })
// ];

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
  constructor(props) {
    super(props);
    //this.updateEditor = _.debounce(this.updateEditor, 500);
  }
  // extend Component or React.Component??
  //Pass the initial value from the Slate editor to the state.
  state = {
    value: initialValue,
    alignment: 'alignLeft',
    userID: null,
    ownerID: null,
    iAmTyping: false,
    someoneElseIsTyping: false,
    isLoading: true // added from DraftEditor
  };

  // componentDidMount added from DraftEditor; where is isEditing coming from? Can isTyping be used instead?
  componentDidMount = () => {
    console.log(this);
    api.subscribe(
      'Documents',
      'show',
      { id: this.props.match.params.id },
      (document) => {
        if (this.state.iAmTyping) return;
        console.log(document);
        this.updateEditor(document);
      }
    );
  };

  // updateEditor takes in incoming changes
  updateEditor = (document) => {
    window.clearTimeout(someoneElseIsTypingTimer);
    this.setState({ document: document, someoneElseIsTyping: true });
    someoneElseIsTypingTimer = window.setTimeout(() => {
      //_.debounce(() => {
      let content = JSON.parse(document.content) || initialValue;
      const docValue = Value.fromJSON(content);
      // instantiating a Value instance with Slate class method fromJSON
      this.setState({
        someoneElseIsTyping: false,
        value: docValue
      });
    }, 300);
    //}, 500)();
  };

  // editDocument added from DraftEditor; editorState and getCurrentContent() native to Draft
  // editDocument = (editorState) => {
  //   const contentState = editorState.getCurrentContent();
  //   clearTimeout(this.stopsEditing);
  //   this.setState({ isEditing: true, editorState: editorState });
  //   this.stopsEditing = setTimeout(
  //     () => this.setState({ isEditing: false }),
  //     1000
  //   );
  //   api.trigger('Documents', 'update', {
  //     id: this.props.match.params.id,
  //     content: JSON.stringify(convertToRaw(contentState))
  //   });
  // };

  onChange = ({ value }) => {
    window.clearTimeout(iAmTypingTimer);
    iAmTypingTimer = window.setTimeout(
      () => this.setState({ iAmTyping: false }),
      300
    );

    this.setState({ value: value, iAmTyping: true }, () => {
      const content = JSON.stringify(value.toJSON());
      // localStorage.setItem('content', content);
      console.log(this.props.document);
      api.trigger('Documents', 'update', {
        id: this.props.match.params.id,
        content: content,
        portfolio_id: this.state.document.portfolio_id
      });
    });
  };

  onKeyDown = (e, change, next) => {
    //console.log(e.key);

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

  // onToggleCurrentWriter = () => {
  //   // this.setState({ isTyping: !this.state.isTyping });

  //   // const { isTyping } = this.state
  //   // this.setState({ isTyping: !isTyping })

  //   const isTyping = !this.state.isTyping;
  //   this.setState({ isTyping });
  // };

  render() {
    return (
      <div>
        <div className="portfolioListBox">
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
        <h4>
          {this.state.someoneElseIsTyping ? 'Someone else is typing' : ''}
        </h4>
        <div style={{ textAlign: this.state.alignment }}>
          {/* <Editor /> is native to Slate.*/}
          <Editor
            ref={this.ref} // ref ~ document.querySelector(); React finds ref() and automatically calls the function associated with it inside render()
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
            // plugins={plugins}
          />
        </div>
      </div>
    );
  }
}
