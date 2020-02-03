import './news.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Grid, Menu, Image, Button } from 'semantic-ui-react';

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
              <Image className="news-page-image" src="content/images/giagia-stasi.png" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14}>
              <h1 className="news-page-h1">ΥouWho? Ερευνα για νέους 17-29 ετών</h1>
              <h3 className="news-page-h3">28.09.2019 • Έρευνες</h3>
              <p className="news-page-p">
                Στο πλαίσιο υλοποίησης του υποέργου «REDI – Αυτεπιστασία ΕΚΚΕ» της Πράξης «Έρευνα, Εκπαίδευση και Υποδομές: ο τριγωνισμός
                των αξόνων στρατηγικής ανάπτυξης του ΕΚΚΕ (REDI)» εντάσσονται τρεις ξεχωριστές έρευνες νεολαίας.
              </p>
              <Button className="news-page-more-button">Περισσότερα</Button>
            </Grid.Column>
          </Grid.Row>
          <div className="news-page-divider" />
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
