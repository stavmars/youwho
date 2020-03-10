/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button, Menu } from 'semantic-ui-react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor, { EditorPlugin } from 'draft-js-plugins-editor';
import HighlightPlugin from './plugins/highlight-plugin';
import addLinkPlugin from './plugins/add-link-plugin';
import BlockStyleButton from 'app/modules/news-editor/block-styles/block-style-button';
import HeaderStyleDropdown, { BLOCK_TYPES, HEADER_TYPES } from 'app/modules/news-editor/block-styles/header-style-dropdown';

export interface INewsEditorProps extends StateProps, DispatchProps {}

export interface INewsEditorState {
  editorState: EditorState;
  plugins: EditorPlugin[];
}

const highlight = HighlightPlugin();

class NewsEditor extends React.Component<INewsEditorProps, INewsEditorState> {
  constructor(props) {
    super(props);
    const content = window.localStorage.getItem('content');
    this.state = {
      editorState: content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty(),
      plugins: [
        // @ts-ignore
        highlight,
        // @ts-ignore
        addLinkPlugin
      ]
    };
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  onChange = editorState => {
    // Save editorState to localStorage to persist data on refresh.
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      ...this.state,
      editorState
    });
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  onUnderlineClick = e => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  onBoldClick = e => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  onItalicClick = e => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  onHighlight = e => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'));
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -');
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    // @ts-ignore
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  render() {
    const { editorState } = this.state;

    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="news-editor-page">
        <Menu text className="news-editor-toolbar">
          <Menu.Item position="right">
            <HeaderStyleDropdown headerOptions={HEADER_TYPES} active={blockType} onToggle={this.toggleBlockType} />
          </Menu.Item>
          {BLOCK_TYPES.map(type => (
            <Menu.Item key={type.label}>
              <BlockStyleButton
                active={type.style === blockType}
                label={type.label}
                onToggle={this.toggleBlockType}
                style={type.style}
                key={type.label}
              />
            </Menu.Item>
          ))}
          <Menu.Item>
            <Button onMouseDown={this.onBoldClick} icon="bold" active={editorState.getCurrentInlineStyle().has('BOLD')} />
          </Menu.Item>
          <Menu.Item>
            <Button onMouseDown={this.onUnderlineClick} icon="underline" active={editorState.getCurrentInlineStyle().has('UNDERLINE')} />
          </Menu.Item>
          <Menu.Item>
            <Button onMouseDown={this.onItalicClick} icon="italic" active={editorState.getCurrentInlineStyle().has('ITALIC')} />
          </Menu.Item>
          <Menu.Item>
            <Button
              onMouseDown={this.onHighlight}
              icon="paint brush"
              active={editorState.getCurrentInlineStyle().has('HIGHLIGHT')}
              style={{ backgroundColor: '#fffe0d' }}
            />
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.onAddLink} icon="linkify" />
          </Menu.Item>
        </Menu>
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Create post below...</span>
        <div className="news-editor-container">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={this.state.plugins}
          />
        </div>
        <Button content="Save post" primary style={{ fontFamily: 'TTNormsProMedium', float: 'right', marginTop: '1em' }} />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsEditor);
