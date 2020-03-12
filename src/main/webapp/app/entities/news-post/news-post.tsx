import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './news-post.reducer';
import { INewsPost } from 'app/shared/model/news-post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INewsPostProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NewsPost extends React.Component<INewsPostProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { newsPostList, match } = this.props;
    return (
      <div>
        <h2 id="news-post-heading">
          News Posts
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new News Post
          </Link>
        </h2>
        <div className="table-responsive">
          {newsPostList && newsPostList.length > 0 ? (
            <Table responsive aria-describedby="news-post-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Content</th>
                  <th>Preview Image</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {newsPostList.map((newsPost, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${newsPost.id}`} color="link" size="sm">
                        {newsPost.id}
                      </Button>
                    </td>
                    <td>{newsPost.content}</td>
                    <td>
                      {newsPost.previewImage ? (
                        <div>
                          <a onClick={openFile(newsPost.previewImageContentType, newsPost.previewImage)}>
                            <img
                              src={`data:${newsPost.previewImageContentType};base64,${newsPost.previewImage}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {newsPost.previewImageContentType}, {byteSize(newsPost.previewImage)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${newsPost.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${newsPost.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${newsPost.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No News Posts found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ newsPost }: IRootState) => ({
  newsPostList: newsPost.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPost);
