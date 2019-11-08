import './students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Button, Container, Grid, Image } from 'semantic-ui-react';

export interface IStudentsProps extends StateProps, DispatchProps {}

export class Students extends React.Component<IStudentsProps> {
  componentDidMount() {
    if (isBrowser) {
      this.props.showSidebar();
    } else {
      this.props.hideSidebar();
    }
  }

  render() {
    return (
      <div className="students-page">
        <div className="students-page-top">
          <Container>
            <h1 className="students-page-top-title">Μαθητές</h1>
            <p className="students-page-top-subtext">
              Πρόκειται για ποσοτική έρευνα πεδίου με αυτο-συμπληρούμενο ερωτηματολόγιο διάρκειας 40 λεπτών σε επιλεγμένες σχολικές μονάδες
              της Αττικής, σε μαθητές όλων των τάξεων του Γυμνασίου. Η συλλογή των δεδομένων έλαβε χώρα από 22 Φεβρουαρίου έως και 30
              Μαρτίου 2018.
            </p>
          </Container>
        </div>
        <Container style={{ marginTop: '30px' }}>
          <h1 className="students-page-title">Highlights</h1>
          <Grid centered>
            <Grid.Column computer={10} mobile={14}>
              <Image src="/content/images/dummy chart.svg" />
            </Grid.Column>
            <Grid.Column computer={4} mobile={14}>
              <p className="students-page-subtext">
                Τα υψηλότερα ποσοστά διαφωνίας με τους καθηγητές (54,6%) προέρχονται από μαθητές με γονείς υψηλής κοινωνικής θέσης.
              </p>
              <Button className="students-page-more-button">Περισσότερα</Button>
            </Grid.Column>
          </Grid>
          <h1 className="students-page-title">έρευνες νεανικού πληθυσμού</h1>
          <p className="students-page-subtext">
            Σε γενικές γραμμές, οι έρευνες νεανικού πληθυσμού έχουν ως αντικείμενο τις ιδεολογικές στάσεις, τις αντιλήψεις, τις αξίες, τον
            τρόπο ζωής, τις καθημερινές συνήθειες και τις αναζητήσεις της νέας γενιάς. Τα θέματα αυτά απασχόλησαν έντονα τους κοινωνικούς
            επιστήμονες ήδη από τη δεκαετία του 1960. Οι επαναλαμβανόμενες μελέτες στο νεανικό πληθυσμό ανέδειξαν τις διαφορές στις στάσεις
            και τις αντιλήψεις που αντανακλούν το κοινωνικο-πολιτικό πλαίσιο της κάθε εποχής. Έτσι, καθιερώθηκαν συγκεκριμένες τυπολογίες
            γενεών όπως οι Baby boomers (η μεταπολεμική γενιά) η γενιά Χ, οι Millennials και εσχάτως η γενιά G.
          </p>
          <Grid style={{ margin: '45px 0' }}>
            <Grid.Column width={1}>
              <div className="vertical-line" />
            </Grid.Column>
            <Grid.Column computer={5} mobile={13}>
              <p className="students-page-important">
                Ιδιαίτερα αξιοσημείωτο ενδιαφέρον, όμως, παρουσιάζουν οι απαντήσεις των νέων ως προς τους παράγοντες που επηρέασαν την
                απόφασή τους να εισαχθούν σε ΑΕΝ.
              </p>
            </Grid.Column>
          </Grid>
          <p className="students-page-subtext">
            Στο πλαίσιο υλοποίησης του υποέργου «REDI – Αυτεπιστασία ΕΚΚΕ» της Πράξης «Έρευνα, Εκπαίδευση και Υποδομές: ο τριγωνισμός των
            αξόνωνστρατηγικής ανάπτυξης του ΕΚΚΕ (REDI)» εντάσσονται τρεις ξεχωριστές έρευνες νεολαίας. Αντικείμενό τους είναι να
            σκιαγραφηθούν οι βασικοί ατομικοί και συλλογικοί παράγοντες προσδιορισμού της ταυτότητας του νεανικού πληθυσμού της χώρας και να
            αποτυπωθεί ο τρόπος που επιμέρους παράγοντες αλληλεπιδρούν στην διαμόρφωση τους. Ως πληθυσμός των τριών αυτών ερευνών ορίζονται
            οι νέοι ηλικίας 15-29 ετών, οι οποίοι οργανώνονται στη βάση επιμέρους κατατμήσεων τους σε εξελικτικό-ηλιακό επίπεδο σε δύο
            ηλικιακές κατηγορίες: τους εφήβους 13-15 ετών και τους νέους ενήλικες 18-29 ετών.
          </p>
        </Container>
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
)(Students);
