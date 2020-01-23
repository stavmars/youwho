import './college-students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Container } from 'semantic-ui-react';

export interface ICollegeStudentsProps extends StateProps, DispatchProps {}

export class CollegeStudents extends React.Component<ICollegeStudentsProps> {
  componentDidMount() {
    if (isBrowser) {
      this.props.showSidebar();
    } else {
      this.props.hideSidebar();
    }
  }

  render() {
    return (
      <div className="college-students-page">
        <div className="college-students-page-top">
          <Container>
            <h1 className="college-students-page-top-title">Φοιτητές</h1>
            <p className="college-students-page-top-subtext">
              Η έρευνα αυτή στοχεύει στην ανίχνευση στάσεων, αντιλήψεων, ταυτοτήτων, συμπεριφορών και προσδοκιών από τις σπουδές τους,
              μέρους του φοιτητικού πληθυσμού της χώρας. Το πεδίο της έρευνας στους φοιτητές θα πραγματοποιηθεί στις αρχές του 2020 σε
              επιλεγμένες πανεπιστημιακές σχολές με διασπορά τόσο των επιστημονικών πεδίων, όσο και των βάσεων εισαγωγής με τη χρήση
              αυτο-συμπληρούμενου ερωτηματολογίου. Από μεθοδολογικής άποψης αυτά τα δεδομένα θα λειτουργήσουν συμπληρωματικά ως προς τα
              δεδομένα της γενικής διαδικτυακής έρευνας για τη σκιαγράφηση υπο-τύπων νέων.
            </p>
          </Container>
        </div>
        {/*<Container style={{ marginTop: '-80px' }}>*/}
        {/*  <h1 className="college-students-page-title">Highlights</h1>*/}
        {/*  <p className="college-students-page-subtext">*/}
        {/*    Τα υψηλότερα ποσοστά διαφωνίας με τους καθηγητές (54,6%) προέρχονται από μαθητές με γονείς υψηλής κοινωνικής θέσης.*/}
        {/*  </p>*/}
        {/*</Container>*/}
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
)(CollegeStudents);
