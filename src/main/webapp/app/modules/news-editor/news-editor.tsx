/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button } from 'semantic-ui-react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// tslint:disable-next-line:no-submodule-imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface INewsEditorProps extends StateProps, DispatchProps {}

export interface INewsEditorState {
  editorState: EditorState;
}

class NewsEditor extends React.Component<INewsEditorProps, INewsEditorState> {
  constructor(props) {
    super(props);
    const content = window.localStorage.getItem('content');
    this.state = {
      editorState: content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    // Save editorState to localStorage to persist data on refresh.
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      ...this.state,
      editorState
    });
  };

  reset = () => {
    this.setState({
      editorState: EditorState.createEmpty()
    });
    window.localStorage.clear();
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="news-editor-page">
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Create post below...</span>
        <div className="news-editor-container">
          <Editor editorState={editorState} onEditorStateChange={this.onChange} />
        </div>
        <Button content="Save post" primary style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 1em' }} />
        <Button
          content="Reset"
          color="red"
          onClick={this.reset}
          style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 0' }}
        />
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
