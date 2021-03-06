/* tslint:disable:jsx-no-lambda */
import './news.scss';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Grid, Menu, Image, Button } from 'semantic-ui-react';
import { getEntities, deleteEntity } from 'app/entities/news-post/news-post.reducer';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export interface INewsProps extends StateProps, DispatchProps {
  isResultsPost: boolean;
}

export class News extends React.Component<INewsProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.hideSidebar();
  }

  componentDidUpdate(prevProps: Readonly<INewsProps>) {
    if (prevProps.isResultsPost !== this.props.isResultsPost) {
      this.props.hideSidebar();
    }
  }

  render() {
    const { loading, newsPosts, isAuthenticated, isResultsPost } = this.props;

    return (
      <div className="news-page">
        <Grid style={{ margin: '50px 0' }} centered>
          <Menu className="news-page-menu" text stackable style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>
            <Menu.Item className="news-page-menu-item" position="left">
              {isResultsPost ? 'Αποτελέσματα' : 'Νέα'}
            </Menu.Item>
            {/*<Menu.Item className="news-page-menu-secondary" position="right">*/}
            {/*  Όλα Εκδηλώσεις Κείμενα Έρευνες*/}
            {/*</Menu.Item>*/}
            {isAuthenticated && (
              <Menu.Item position="right">
                <Button content="Create Post" as={NavLink} to="/post-editor/new" style={{ backgroundColor: '#777eff', color: 'white' }} />
              </Menu.Item>
            )}
          </Menu>
        </Grid>
        {loading ? (
          <div />
        ) : (
          <Grid centered style={{ marginBottom: '50px' }}>
            {_.orderBy(newsPosts, post => moment(post.postDate), ['desc']).map(
              newsPost =>
                (isResultsPost ? newsPost.resultsPost : !newsPost.resultsPost) &&
                (isAuthenticated || newsPost.published) && (
                  <Grid.Row key={newsPost.id} className="news-page-row" columns={isAuthenticated ? 3 : 2}>
                    <Grid.Column computer={3} mobile={14} verticalAlign="middle">
                      {newsPost.previewImage ? (
                        <Image src={`data:${newsPost.previewImageContentType};base64,${newsPost.previewImage}`} size="medium" />
                      ) : (
                        <Image className="news-page-image" src="content/images/HeaderLogo.png" />
                      )}
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={14} verticalAlign="middle">
                      <h1 className="news-page-h1">{newsPost.previewTitle}</h1>
                      <h3 className="news-page-h3">{moment(newsPost.postDate).format('DD.MM.YYYY')}</h3>
                      <Button className="news-page-more-button" floated="right" as={NavLink} to={`/post-display/${newsPost.id}`}>
                        Περισσότερα
                      </Button>
                    </Grid.Column>
                    {isAuthenticated && (
                      <Grid.Column only="computer" verticalAlign="middle" computer={1}>
                        <Button
                          icon="edit"
                          as={NavLink}
                          to={`/post-editor/${newsPost.id}/edit`}
                          style={{ backgroundColor: '#777eff', color: 'white' }}
                        />
                        <br />
                        <br />
                        <Button
                          icon="delete"
                          as={NavLink}
                          to={`/entity/news-post/${newsPost.id}/delete`}
                          style={{ backgroundColor: '#ff6666', color: 'white' }}
                        />
                      </Grid.Column>
                    )}
                  </Grid.Row>
                )
            )}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  isSidebarVisible: storeState.header.isSidebarVisible,
  newsPosts: storeState.newsPost.entities,
  loading: storeState.newsPost.loading
});

const mapDispatchToProps = {
  getEntities,
  deleteEntity,
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
