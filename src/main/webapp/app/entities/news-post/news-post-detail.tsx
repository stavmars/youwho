import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './news-post.reducer';
import { INewsPost } from 'app/shared/model/news-post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INewsPostDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NewsPostDetail extends React.Component<INewsPostDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { newsPostEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            NewsPost [<b>{newsPostEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">Content</span>
            </dt>
            <dd>{newsPostEntity.content}</dd>
            <dt>
              <span id="previewImage">Preview Image</span>
            </dt>
            <dd>
              {newsPostEntity.previewImage ? (
                <div>
                  <a onClick={openFile(newsPostEntity.previewImageContentType, newsPostEntity.previewImage)}>
                    <img
                      src={`data:${newsPostEntity.previewImageContentType};base64,${newsPostEntity.previewImage}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {newsPostEntity.previewImageContentType}, {byteSize(newsPostEntity.previewImage)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/news-post" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/news-post/${newsPostEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ newsPost }: IRootState) => ({
  newsPostEntity: newsPost.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPostDetail);
