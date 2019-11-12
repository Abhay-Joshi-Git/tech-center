import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import './RichTextEditor.css';
import { BlockStyleControls, InlineStyleControls, getBlockStyle } from './controls';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const convertRawToEditorState = rawData => {
  return EditorState.createWithContent(convertFromRaw(rawData));
};

const convertEditorDataToRawData = editorState => {
  return convertToRaw(editorState.getCurrentContent());
};

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    const data = props.defaultValue
      ? convertRawToEditorState(JSON.parse(props.defaultValue))
      : EditorState.createEmpty();
    this.state = { editorState: data };
    this.focus = () => this.refs.editor.focus();
    this._onChange = editorState => {
      this.setState({ editorState });
      if (props.onChange && typeof props.onChange === 'function') {
        props.onChange(convertEditorDataToRawData(editorState));
      }
    };
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  getData() {
    return convertEditorDataToRawData(this.state.editorState);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this._onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this._onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this._onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {
    const { editorState } = this.state;
    const { readOnly } = this.props;

    let className = `${readOnly ? 'RichEditor-editor no-border' : 'RichEditor-editor'}`;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        {!readOnly && (
          <>
            <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          </>
        )}

        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this._onChange}
            onTab={this.onTab}
            readOnly={readOnly}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default RichTextEditor;
