import './news.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Grid, Menu, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface INewsProps extends StateProps, DispatchProps {}

export class News extends React.Component<INewsProps> {
  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
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
        <Grid centered style={{ marginBottom: '50px' }}>
          <Grid.Row>
            <Grid.Column computer={3} mobile={14} verticalAlign="middle">
              <Image className="news-page-image" src="content/images/news1.png" size="medium" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14} verticalAlign="middle">
              <h1 className="news-page-h1">Είσαι 17-29 ετών; Τότε αυτή η έρευνα σε αφορά!</h1>
              <h3 className="news-page-h3">11.03.2020 • Έρευνες</h3>
              <Button className="news-page-more-button" as={NavLink} to="news1">
                Περισσότερα
              </Button>
            </Grid.Column>
          </Grid.Row>
          <div className="news-page-divider" />
          <Grid.Row>
            <Grid.Column computer={3} mobile={14} verticalAlign="middle">
              <Image className="news-page-image" src="content/images/ert.jpg" size="medium" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14} verticalAlign="middle">
              <h1 className="news-page-h1">ΕΡΤ: «Εσύ πόσο YouWho είσαι;»</h1>
              <h3 className="news-page-h3">11.03.2020 • Δημοσιεύσεις</h3>
              <p className="news-page-p">
                Το άρθρο δημοσιεύθηκε στις 4 Μαρτίου 2020 στο
                <a
                  href="https://www.ert.gr/eidiseis/mono-sto-ertgr/erevna-youwho-neoi/?fbclid=IwAR1oaGXQhd-jcaAsMbMnOQ5qLn7QbTEoHfoYsT-SWsZOEtCYWxi4aX0gLig"
                  target="_blank"
                >
                  {' '}
                  ERT.gr
                </a>
              </p>
              <Button className="news-page-more-button" as={NavLink} to="news2">
                Περισσότερα
              </Button>
            </Grid.Column>
          </Grid.Row>
          <div className="news-page-divider" />
          <Grid.Row>
            <Grid.Column computer={3} mobile={14} verticalAlign="middle">
              <Image src="content/images/tmp-news/Lifo_Logo.jpg" size="medium" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14} verticalAlign="middle">
              <h1 className="news-page-h1">LIFO: Είσαι 17-29 ετών; Τότε αυτή η έρευνα σε αφορά</h1>
              <h3 className="news-page-h3">31.03.2020 • Δημοσιεύσεις</h3>
              <p className="news-page-p">
                Το άρθρο δημοσιεύθηκε στις 12 Μαρτίου 2020 στο
                <a href="https://www.lifo.gr/articles/greece_articles/273130/eisai-17-29-eton-tote-ayti-i-ereyna-se-afora" target="_blank">
                  {' '}
                  lifo.gr
                </a>
              </p>
              <Button className="news-page-more-button" as={NavLink} to="news3">
                Περισσότερα
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible
});

const mapDispatchToProps = {
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
