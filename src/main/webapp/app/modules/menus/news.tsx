import './news.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Grid, Menu, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface INewsProps extends StateProps, DispatchProps {}

export class News extends React.Component<INewsProps> {
  componentDidMount() {
    if (isBrowser) {
      this.props.showSidebar();
    } else {
      this.props.hideSidebar();
    }
  }

  render() {
    return (
      <div className="news-page">
        <Grid style={{ margin: '50px 0' }} centered>
          <Menu className="news-page-menu" text stackable style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>
            <Menu.Item className="news-page-menu-item" position="left">
              Νέα
            </Menu.Item>
            <Menu.Item className="news-page-menu-secondary" position="right">
              Όλα Εκδηλώσεις Κείμενα Έρευνες
            </Menu.Item>
          </Menu>
        </Grid>
        <Grid centered>
          <Grid.Row>
            <Grid.Column computer={3} mobile={14}>
              <Image className="news-page-image" src="content/images/giagia.png" />
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
          <Grid.Row>
            <Grid.Column mobile={14} only="mobile">
              <Image className="news-page-image" src="content/images/csm_1303_ypogennitikotita_95db309f9f.png" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14}>
              <h1 className="news-page-h1">Ημερίδα - Δράση για την Υπογεννητικότητα</h1>
              <h3 className="news-page-h3">28.09.2019 • Εκδηλώσεις</h3>
              <p className="news-page-p">
                Στο πλαίσιο υλοποίησης του υποέργου «REDI – Αυτεπιστασία ΕΚΚΕ» της Πράξης «Έρευνα, Εκπαίδευση και Υποδομές: ο τριγωνισμός
                των αξόνων στρατηγικής ανάπτυξης του ΕΚΚΕ (REDI)» εντάσσονται τρεις ξεχωριστές έρευνες νεολαίας.
              </p>
              <Button className="news-page-more-button">Περισσότερα</Button>
            </Grid.Column>
            <Grid.Column computer={3} only="computer">
              <Image className="news-page-image" src="content/images/csm_1303_ypogennitikotita_95db309f9f.png" />
            </Grid.Column>
          </Grid.Row>
          <div className="news-page-divider" />
          <Grid.Row>
            <Grid.Column computer={3} mobile={14}>
              <Image className="news-page-image" src="content/images/k2_items_src_fdf563fc52afab9bcc613f75df1c95b9.png" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={14}>
              <h1 className="news-page-h1">Η νεολαία της Αττικής και όχι των νησιών στρέφεται στο Ναυτικό Επάγγελμα</h1>
              <h3 className="news-page-h3">28.09.2019 • Άρθρα</h3>
              <p className="news-page-p">
                Πρακτικό επιτροπής αξιολόγησης προτάσεων που έχουν υποβληθεί κατόπιν Πρόσκλησης εκδήλωσης ενδιαφέροντος για υποβολή
                προτάσεων για την πλήρωση τριών θέσεων.
              </p>
              <Button className="news-page-more-button">Περισσότερα</Button>
            </Grid.Column>
          </Grid.Row>
          <div className="content-divider" />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible
});

const mapDispatchToProps = {
  showSidebar,
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
