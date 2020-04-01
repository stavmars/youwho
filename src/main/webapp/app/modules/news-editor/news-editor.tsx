/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button, Dimmer, Loader, Grid, Image } from 'semantic-ui-react';
import { createEntity as createNewsPost, setBlob, reset } from 'app/entities/news-post/news-post.reducer';
// tslint:disable-next-line:no-submodule-imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { setFileData } from 'react-jhipster';
import moment from 'moment';

import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export interface INewsEditorProps extends StateProps, DispatchProps {}

class NewsEditor extends React.Component<INewsEditorProps> {
  editor = React.createRef<CKEditor>();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.reset();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  save = () => {
    const editorData = this.editor.current.editor.getData();
    const { newsPostEntity } = this.props;
    this.props.createNewsPost({
      ...newsPostEntity,
      // @ts-ignore
      previewTitle: document.getElementById('news-post-previewTitle').value,
      postDate: moment(),
      content: `${editorData}`
    });
    this.clearBlob('previewImage');
    this.props.reset();
  };

  render() {
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
          <CKEditor
            editor={DecoupledEditor}
            onInit={editor => {
              // Inserts the toolbar before the editable area.
              editor.ui.view.editable.element.parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.view.editable.element);
            }}
            ref={this.editor}
          />
        </div>
        <Button
          content="Save post"
          primary
          onClick={this.save}
          disabled={
            document.getElementById('news-post-previewTitle') === null ||
            // @ts-ignore
            document.getElementById('news-post-previewTitle').value.length === 0
          }
          style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 1em' }}
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
