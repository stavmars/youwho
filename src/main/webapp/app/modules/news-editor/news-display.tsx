/* tslint:disable:jsx-no-lambda */
import './news-editor.scss';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { getEntity, reset } from 'app/entities/news-post/news-post.reducer';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Dimmer, Loader, Container } from 'semantic-ui-react';
import { defaultValue } from 'app/shared/model/news-post.model';

export interface INewsDisplayProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NewsDisplay extends React.Component<INewsDisplayProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { newsPost, loading, errorMessage } = this.props;

    return loading || newsPost === defaultValue ? (
      <Dimmer active page>
        <Loader />
      </Dimmer>
    ) : errorMessage === null ? (
      <div className="news-display-page">
        <Container>
          <Editor readOnly toolbarHidden editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(newsPost.content)))} />
        </Container>
      </div>
    ) : (
      <div className="news-display-page">{errorMessage}</div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  newsPost: storeState.newsPost.entity,
  loading: storeState.newsPost.loading,
  errorMessage: storeState.newsPost.errorMessage
});

const mapDispatchToProps = {
  getEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDisplay);
