import './news.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Grid, Menu, Image, Button } from 'semantic-ui-react';
import { getEntities } from 'app/entities/news-post/news-post.reducer';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export interface INewsProps extends StateProps, DispatchProps {}

export class News extends React.Component<INewsProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.hideSidebar();
  }

  render() {
    const { loading, newsPosts } = this.props;

    return (
      <div className="news-page">
        <Grid style={{ margin: '50px 0' }} centered>
          <Menu className="news-page-menu" text stackable style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>
            <Menu.Item className="news-page-menu-item" position="left">
              Νέα
            </Menu.Item>
            {/*<Menu.Item className="news-page-menu-secondary" position="right">*/}
            {/*  Όλα Εκδηλώσεις Κείμενα Έρευνες*/}
            {/*</Menu.Item>*/}
          </Menu>
        </Grid>
        {loading ? (
          <h1 className="news-page-h1" style={{ textAlign: 'center' }}>
            Loading...
          </h1>
        ) : (
          <Grid centered style={{ marginBottom: '50px' }}>
            {newsPosts.map(newsPost => (
              <Grid.Row>
                <Grid.Column computer={3} mobile={14} verticalAlign="middle">
                  {newsPost.previewImage ? (
                    <Image src={`data:${newsPost.previewImageContentType};base64,${newsPost.previewImage}`} size="medium" />
                  ) : (
                    <Image className="news-page-image" src="content/images/HeaderLogo.png" />
                  )}
                </Grid.Column>
                <Grid.Column computer={5} mobile={14} verticalAlign="middle">
                  <h1 className="news-page-h1">{newsPost.previewTitle}</h1>
                  <h3 className="news-page-h3">{moment(newsPost.postDate).format('DD.MM.YYYY | HH:mm')}</h3>
                  <Button className="news-page-more-button" as={NavLink} to={`/news-display/${newsPost.id}`}>
                    Περισσότερα
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible,
  newsPosts: storeState.newsPost.entities,
  loading: storeState.newsPost.loading
});

const mapDispatchToProps = {
  getEntities,
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
