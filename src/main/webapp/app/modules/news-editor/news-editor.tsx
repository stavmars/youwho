/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button, Dimmer, Loader, Grid, Image } from 'semantic-ui-react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { createEntity as createNewsPost, setBlob, reset } from 'app/entities/news-post/news-post.reducer';
// tslint:disable-next-line:no-submodule-imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { setFileData } from 'react-jhipster';
import moment from 'moment';

const getFileBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // Since FileReader is asynchronous,
  // we need to pass data back.
  reader.onload = () => callback(reader.result);
  // catch an error
  reader.onerror = error => alert(error);
};

const imageUploadCallback = file => new Promise((resolve, reject) => getFileBase64(file, data => resolve({ data: { link: data } })));

const toolbar = {
  options: ['inline', 'blockType', 'textAlign', 'fontSize', 'fontFamily', 'link', 'image', 'history'],
  inline: {
    options: ['underline', 'strikethrough', 'monospace']
  },
  fontFamily: {
    options: [
      'TTNormsProBlack',
      'TTNormsProBlackItalic',
      'TTNormsProBold',
      'TTNormsProBoldItalic',
      'TTNormsProExtraBlack',
      'TTNormsProExtraBlackItalic',
      'TTNormsProExtraBold',
      'TTNormsProExtraBoldItalic',
      'TTNormsProExtraLight',
      'TTNormsProExtraLightItalic',
      'TTNormsProItalic',
      'TTNormsProLight',
      'TTNormsProLightItalic',
      'TTNormsProMedium',
      'TTNormsProMediumItalic',
      'TTNormsProRegular',
      'TTNormsProThin',
      'TTNormsProThinItalic'
    ]
  },
  image: {
    uploadCallback: imageUploadCallback,
    previewImage: true,
    alt: {
      present: true,
      mandatory: true
    }
  }
};

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

  componentDidMount() {
    this.props.reset();
  }

  onChange = editorState => {
    // Save editorState to localStorage to persist data on refresh.
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      ...this.state,
      editorState
    });
  };

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  save = () => {
    const { editorState } = this.state;
    const { newsPostEntity } = this.props;
    this.props.createNewsPost({
      ...newsPostEntity,
      // @ts-ignore
      previewTitle: document.getElementById('news-post-previewTitle').value,
      postDate: moment(),
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    });
    this.clearBlob('previewImage');
    this.props.reset();
    this.clear();
  };

  clear = () => {
    this.setState({
      editorState: EditorState.createEmpty()
    });
    window.localStorage.clear();
  };

  render() {
    const { editorState } = this.state;
    const { loading, newsPostEntity } = this.props;

    const { previewImage, previewImageContentType } = newsPostEntity;

    return loading ? (
      <Dimmer active page>
        <Loader />
      </Dimmer>
    ) : (
      <div className="news-editor-page">
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Add a Preview Title...</span>
        <br />
        <br />
        <input id="news-post-previewTitle" type="text" name="previewTitle" required />
        <br />
        <br />
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Add a Preview Image...</span>
        <br />
        <br />
        {previewImage ? (
          <Grid style={{ width: '30vw' }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src={`data:${previewImageContentType};base64,${previewImage}`} style={{ maxHeight: '200px' }} />
              </Grid.Column>
              <Grid.Column>
                <Button
                  onClick={this.clearBlob('previewImage')}
                  style={{
                    marginLeft: '20px',
                    marginTop: '70px'
                  }}
                  color="red"
                  icon="undo"
                  size="tiny"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null}
        <input id="file_previewImage" type="file" onChange={this.onBlobChange(true, 'previewImage')} accept="image/*" />
        <br />
        <br />
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Create post below...</span>
        <div className="news-editor-container">
          <Editor editorState={editorState} onEditorStateChange={this.onChange} toolbar={toolbar} />
        </div>
        <Button
          content="Save post"
          primary
          onClick={this.save}
          // @ts-ignore
          disabled={
            document.getElementById('news-post-previewTitle') === null ||
            document.getElementById('news-post-previewTitle').value.length === 0
          }
          style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 1em' }}
        />
        <Button
          content="Clear"
          color="red"
          onClick={this.clear}
          style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 0' }}
        />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  newsPostEntity: storeState.newsPost.entity,
  loading: storeState.newsPost.loading
});

const mapDispatchToProps = {
  setBlob,
  reset,
  createNewsPost
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsEditor);
