/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button, Dimmer, Loader, Grid, Image } from 'semantic-ui-react';
import {
  createEntity as createNewsPost,
  getEntity as getNewsPost,
  updateEntity as updateNewsPost,
  setBlob,
  reset
} from 'app/entities/news-post/news-post.reducer';
// tslint:disable-next-line:no-submodule-imports
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { setFileData } from 'react-jhipster';
import moment, { Moment } from 'moment';

import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import { RouteComponentProps } from 'react-router-dom';
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';

export interface INewsEditorProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INewsEditorState {
  isNew: boolean;
  title: string;
  published: boolean;
  date: Moment;
}

class NewsEditor extends React.Component<INewsEditorProps, INewsEditorState> {
  editor = React.createRef<CKEditor>();

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      title: '',
      date: null,
      published: false
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getNewsPost(this.props.match.params.id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidUpdate(prevProps: Readonly<INewsEditorProps>, prevState: Readonly<INewsEditorState>) {
    if (prevProps.newsPostEntity.id !== this.props.newsPostEntity.id && !this.state.isNew) {
      this.setState({
        ...this.state,
        title: this.props.newsPostEntity.previewTitle,
        date: this.props.newsPostEntity.postDate,
        published: this.props.newsPostEntity.published
      });
    }
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  onTitleChange = event => {
    this.setState({
      ...this.state,
      title: event.target.value
    });
  };

  onDateChange = event => {
    this.setState({
      ...this.state,
      date: moment(event.target.value)
    });
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  changePublish = () =>
    this.setState({
      ...this.state,
      published: !this.state.published
    });

  save = () => {
    const editorData = this.editor.current.editor.getData();
    const { newsPostEntity } = this.props;
    if (this.state.isNew) {
      this.props.createNewsPost({
        ...newsPostEntity,
        previewTitle: this.state.title,
        postDate: this.state.date,
        published: this.state.published,
        content: `${editorData}`
      });
    } else {
      this.props.updateNewsPost({
        ...newsPostEntity,
        previewTitle: this.state.title,
        postDate: this.state.date,
        published: this.state.published,
        content: `${editorData}`
      });
    }
  };

  handleClose = () => {
    this.props.history.push('/menus/news');
  };

  render() {
    const { loading, newsPostEntity } = this.props;
    const { isNew } = this.state;

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
        <input
          id="news-post-previewTitle"
          type="text"
          name="previewTitle"
          value={this.state.title}
          onChange={this.onTitleChange}
          required
        />
        <br />
        <br />
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Add Post Date...</span>
        <br />
        <br />
        <input
          id="news-post-postDate"
          type="datetime-local"
          name="postDate"
          placeholder={'YYYY-MM-DD HH:mm'}
          onChange={this.onDateChange}
          value={convertDateTimeFromServer(this.state.date)}
        />
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
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Check if post should be published...</span>{' '}
        <input type="checkbox" name="published" checked={this.state.published} onChange={this.changePublish} />
        <br />
        <br />
        <span style={{ fontFamily: 'TTNormsProMedium' }}>Create post below...</span>
        <div className="news-editor-container">
          <CKEditor
            editor={DecoupledEditor}
            data={!isNew ? newsPostEntity.content : null}
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
          style={{ fontFamily: 'TTNormsProMedium', float: 'right', margin: '1em 0 0 1em' }}
        />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  newsPostEntity: storeState.newsPost.entity,
  updateSuccess: storeState.newsPost.updateSuccess,
  loading: storeState.newsPost.loading
});

const mapDispatchToProps = {
  setBlob,
  reset,
  createNewsPost,
  getNewsPost,
  updateNewsPost
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsEditor);
