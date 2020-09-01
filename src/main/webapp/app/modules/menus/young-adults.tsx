import './young-adults.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Container, Grid, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ResultsAverage from 'app/modules/results/results-average';

export interface IYoungAdultsProps extends StateProps, DispatchProps {}

export class YoungAdults extends React.Component<IYoungAdultsProps> {
  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    return (
      <div className="young-adults-page">
        <div className="young-adults-page-top">
          <Container>
            <h1 className="young-adults-page-top-title">Νέοι 17-29</h1>
            <p className="young-adults-page-top-subtext">
              Η έρευνα <NavLink to="/">YouWho?</NavLink> στοχεύει στη διερεύνηση των πολιτικών και κοινωνικών χαρακτηριστικών των νέων{' '}
              <span className="bold">που γεννήθηκαν μεταξύ των ετών 1991-2003</span> και συνεπώς βρίσκονταν στο ηλικιακό εύρος των{' '}
              <span className="bold">17-29 ετών</span> κατά την περίοδο διεξαγωγής της. Η συλλογή των δεδομένων έγινε διαδικτυακά κατά την
              περίοδο 17/2 - 5/4/2020 με πάνω από 25.000 συμπληρωμένα ερωτηματολόγια. Για τις ανάγκες της έρευνας δημιουργήθηκε μία ψηφιακή
              εφαρμογή συλλογής δεδομένων με τη χρήση chat bot σε αυτόν τον ιστότοπο.
            </p>
          </Container>
        </div>
        <Container>
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column computer={11}>
                <Image src="content/images/YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Η-γιαγιά-Έρευνα-Νέων-Erevna-Neon-Γιουχου-17-29.png" />
              </Grid.Column>
              <Grid.Column computer={5}>
                <p className="young-adults-page-text">
                  Μετά την ολοκλήρωση του ερωτηματολογίου καθένας και καθεμία, μπορούσε να δει τα αποτελέσματα για το προφίλ του -ης με βάση
                  τρία συνθετικά δίπολα που αντλούσαν πληροφορίες από απαντήσεις σε συγκεκριμένες ερωτήσεις. Παράλληλα, μπορούσε να
                  συγκρίνει το προφίλ του -ης με τα συγκεντρωτικό αποτέλεσμα όσων είχαν ήδη συμπληρώσει το ερωτηματολόγιο.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <ResultsAverage />
        <Container>
          <Image
            className="young-adults-page-footer-image"
            src="content/images/YouWho.gr-Yellow-Stripes-Erevna-Neon-Έρευνα-Νέων-Έρευνα-Νέας-Γενιάς-Γιουχιου.png"
          />
        </Container>
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
)(YoungAdults);
