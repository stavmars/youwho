import './college-students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Container } from 'semantic-ui-react';

export interface ICollegeStudentsProps extends StateProps, DispatchProps {}

export class CollegeStudents extends React.Component<ICollegeStudentsProps> {
  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    return (
      <div className="college-students-page">
        <div className="college-students-page-top">
          <Container>
            <h1 className="college-students-page-top-title">Φοιτητές</h1>
            <p className="college-students-page-top-subtext">
              Η έρευνα YouWho?Student στοχεύει στην ανίχνευση των αντιλήψεων του φοιτητικού πληθυσμού της χώρας για την φοιτητική ιδιότητα
              και επικεντρώσει στις στάσεις τους για το παρόν και το μέλλον. Η συλλογή των δεδομένων θα πραγματοποιηθεί on line, λόγω της
              αναστολής των δια ζώσης λειτουργιών των Πανεπιστημίων κατά τη διάρκεια του εαρινού εξαμήνου 2021. Από μεθοδολογικής άποψης
              αυτά τα δεδομένα θα λειτουργήσουν συμπληρωματικά ως προς τα δεδομένα της γενικής διαδικτυακής έρευνας YouWho? για τη
              σκιαγράφηση των πολλαπλών ταυτοτήτων των νέων. Επιπλέον, επιχειρείται και μια σύντομη αποτίμηση των αντιλήψεων των φοιτητών
              που άπτονται της συγκυρίας της πανδημίας του COVID-19.
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
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollegeStudents);
