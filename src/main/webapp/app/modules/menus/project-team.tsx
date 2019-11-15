import './project-team.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Image, Grid, Menu, Container } from 'semantic-ui-react';
import { NavHashLink } from 'react-router-hash-link';

export interface IProjectTeamProps extends StateProps, DispatchProps {}

export class ProjectTeam extends React.Component<IProjectTeamProps> {
  componentDidMount() {
    if (isBrowser) {
      this.props.showSidebar();
    } else {
      this.props.hideSidebar();
    }
  }

  // only consider an event active if its event id is an odd number
  isActive = hash => (match, location) => {
    if (location.hash === hash) {
      return true;
    }
  };

  render() {
    return (
      <div>
        <Grid style={{ marginTop: '50px' }} centered>
          <Menu text compact style={{ background: 'transparent', borderStyle: 'none' }}>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#manina')} smooth to="#manina" replace={false}>
                <Image size="tiny" circular src="/content/images/project-team/_MG_4451-1.png" />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#iliou')} smooth to="#iliou" replace={false}>
                <Image size="tiny" circular src="/content/images/project-team/_MG_4402-2.png" />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#gpapas')} smooth to="#gpapas" replace={false}>
                <Image size="tiny" circular src="/content/images/project-team/_MG_4570-1.png" />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#irene')} smooth to="#irene" replace={false}>
                <Image size="tiny" circular src="/content/images/project-team/_MG_4435-1.png" />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#costis')} smooth to="#costis" replace={false}>
                <Image size="tiny" circular src="/content/images/project-team/_MG_4476-1.png" />
              </NavHashLink>
            </Menu.Item>
          </Menu>
        </Grid>
        <Grid className="project-team-page" centered>
          <Grid.Row>
            <Grid.Column computer={3}>
              <Image className="project-team-page-image" src="/content/images/project-team/_MG_4451.png" />
            </Grid.Column>
            <Grid.Column computer={5}>
              <h1 id="manina" className="project-team-page-title">
                Μανίνα Καπεκάκη
              </h1>
              <h2 className="project-team-page-subtitle">Επιστημονική συν-υπεύθυνη έργου</h2>
              <p className="project-team-page-description">
                Ερευνήτρια στο Εθνικό Κέντρο Κοινωνικών Ερευνών (ΕΚΚΕ). Σπούδασε πολιτική επιστήμη και πολιτική συμπεριφορά στην Αθήνα και
                το Essex και έλαβε το διδακτορικό της δίπλωμα από το Πανεπιστήμιο Αθηνών. Έχει συμμετάσχει σε πολλά διεθνή και ελληνικά
                ερευνητικά προγράμματα ενώ τα τρέχοντα ερευνητικά της ενδιαφέροντα εστιάζονται στις πολιτικές ελίτ και τις ανισότητες στην
                πολιτική αντιπροσώπευση, καθώς και στην μελέτη της ταυτότητας των νέων. Από τις εκδόσεις Παπαζήση κυκλοφορεί σε επιμέλεια
                της το βιβλίο «Η Πολιτική Αντιπροσώπευση στη Σύγχρονη Ελλάδα. Χαρακτηριστικά και Φυσιογνωμία των Μελών του Ελληνικού
                Κοινοβουλίου 1996-2015».
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column computer={5}>
              <h1 id="iliou" className="project-team-page-title">
                Κατερίνα Ηλιού
              </h1>
              <h2 className="project-team-page-subtitle">Επιστημονική συν-υπεύθυνη έργου</h2>
              <p className="project-team-page-description">
                Κάτοχος διδακτορικού διπλώματος στην Κοινωνική Ψυχολογία (Πάντειο Πανεπιστήμιο, τμήμα Ψυχολογίας) με αντικείμενο τις «Νέες
                μορφές προκατάληψης» και δύο μεταπτυχιακών διπλωμάτων, ένα με ειδικότητα στον «Κοινωνικό αποκλεισμό και μειονότητες» και ένα
                με ειδικότητα στην «Εκπαίδευση Ενηλίκων». Εργάζεται ως ερευνήτρια στο Εθνικό Κέντρο Κοινωνικών Ερευνών, Ινστιτούτο Πολιτικής
                Κοινωνιολογίας. Έχει συμμετάσχει στην εκπόνηση μελετών πεδίου σε πλαίσιο εθνικών και διεθνών προγραμμάτων και έχει
                πραγματοποιήσει δημοσιεύσεις και εισηγήσεις σε διεθνή συνέδρια. Τα επιστημονικά της ενδιαφέροντα περιλαμβάνουν θέματα, όπως
                προκατάληψη, ρατσισμός, πατριωτισμός, κοινωνική ταυτότητα, ταυτότητα νέων και κλίμακες μέτρησης στάσεων.
              </p>
            </Grid.Column>
            <Grid.Column computer={3}>
              <Image className="project-team-page-image" src="/content/images/project-team/_MG_4402-1@2x.png" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column computer={3}>
              <Image className="project-team-page-image" src="/content/images/project-team/_MG_4570.png" />
            </Grid.Column>
            <Grid.Column computer={5}>
              <h1 id="gpapas" className="project-team-page-title">
                Γιώργος Παπαστεφανάτος
              </h1>
              <h2 className="project-team-page-subtitle">Τεχνικός υπεύθυνος έργου</h2>
              <p className="project-team-page-description">
                Ο Δρ. Γεώργιος Παπαστεφανάτος είναι διπλωματούχος μηχανικός της Σχολής Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του
                Εθνικού Μετσόβιου Πολυτεχνείου (ΕΜΠ), από το οποίο αποφοίτησε το 2000. Το 2009 αναγορεύτηκε Διδάκτωρ Μηχανικός στη Σχολή
                Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του ΕΜΠ, στην ερευνητική περιοχή των Βάσεων Δεδομένων και Πληροφοριακών
                Συστημάτων. Από το 2009 είναι ερευνητικός συνεργάτης στο Ινστιτούτο Πληροφοριακών Συστημάτων του Ε.Κ. “Αθηνά”. Έχει εργαστεί
                ως μηχανικός λογισμικού και ερευνητής σε ερευνητικά προγράμματα του ΕΜΠ και του ΕΠΙΣΕΥ. Επίσης, ως τεχνικός σύμβουλος,
                συνεργάστηκε και ανέλαβε την ανάπτυξη πληροφοριακών συστημάτων σε διάφορες εταιρίες και οργανισμούς όπως η ΕΤΒΑ – ΒΙ.ΠΕ., η
                Citibank, η ΕΥΔ-ΕΠΕΑΕΚ, κ.α. Τέλος, από το 2006 έως το 2015 συνεργάστηκε ως εμπειρογνώμονας με την Ελληνική Στατιστική Αρχή
                – Διεύθυνση Πρωτογενούς Τομέα και Διεύθυνση Πληροφορικής, στο σχεδιασμό και υλοποίηση του πληροφοριακού συστήματος για τη
                διεξαγωγή στατιστικών ερευνών και απογραφών. Τέλος, υπήρξε επιστημονικός υπεύθυνος εκ μέρους του ΕΚ. ΑΘΗΝΑ στο έργο «Sodamap
                - Δυναμική διαχείριση βάσεων Κοινωνικών δεδομένων και Χαρτογραφικών αναπαραστάσεων», πρόσκληση “ΚΡΗΠΙΣ” της ΓΓΕΤ όπου σε
                συνεργασία με το Εθνικό Κέντρο Κοινωνικών Ερευνών υλοποίησαν την πλατφόρμα Καλειδοσκόπιο Κοινωνικών Δεδομένων
                (www.socioscope.gr), μια ψηφιακή υποδομή η οποία δίνει τη δυνατότητα οπτικοποίησης και ανάλυσης κοινωνικών και πολιτικών
                δεδομένων.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column computer={5}>
              <h1 id="irene" className="project-team-page-title">
                Ειρήνη Κυριαζοπούλου
              </h1>
              <h2 className="project-team-page-subtitle">Υπεύθυνη επικοινωνίας</h2>
              <p className="project-team-page-description">
                Είναι ερευνήτρια (Ειδικός Λειτουργικός Επιστήμονας Α’ βαθμίδας) στο Εθνικό Κέντρο Κοινωνικών Ερευνών από το 1994. Σπούδασε
                Νομικά στο Πανεπιστήμιο Αθηνών και Δημοσιογραφία στο Εργαστήριο Επαγγελματικής Δημοσιογραφίας. Στη συνέχεια με υποτροφία
                συνέχισε σε μεταπτυχιακές σπουδές στο City University στο Λονδίνο, και απέκτησε τον τίτλο σπουδών ‘Master of Arts in
                Communications Policy Studies’ . Η ερευνητική της δραστηριότητα (ερευνητικά προγράμματα, δημοσιεύσεις, συμμετοχές σε
                συνέδρια) και το επιστημονικό της ενδιαφέρον εστιάζονται στη πολιτική- κοινωνική - ατομική διάσταση του Επικοινωνιακού
                Συστήματος (Έντυπα & Ηλεκτρονικά ΜΜΕ, Τηλεπικοινωνίες- Διαδίκτυο) και σε τομείς όπως: Δομές Επικοινωνιών, Ψηφιακή Σύγκλιση,
                Εφαρμοσμένες Πολιτικές, Συσχετισμοί και σε Εθνικό, Ευρωπαϊκό & Διεθνές πλαίσιο, Στρατηγικές ανάπτυξης και αλληλεπιδράσεις,
                Μηχανισμοί ελέγχου και Κέντρα Λήψης Αποφάσεων, Πολιτική της Διαφήμισης, Κώδικες επικοινωνίας (Λόγου και εικόνας),
                Σημειωτική, κοινωνικά και ατομικά θέματα της ‘Κοινωνίας των Πληροφοριών’. Επιπλέον, έχει ασχοληθεί με θέματα κοινωνικών
                ανισοτήτων, μετανάστευσης, φύλου και κοινωνικής συνοχής. Ειδικότερα, οι ερευνητικές της προσεγγίσεις μεθοδολογικά αφορούν
                στις ποιοτικές μεθόδους έρευνας (σημειωτική, ανάλυση περιεχομένου, ανάλυση λόγου, βιογραφικές συνεντεύξεις, ομάδες
                εστίασης).
              </p>
            </Grid.Column>
            <Grid.Column computer={3}>
              <Image className="project-team-page-image" src="/content/images/project-team/_MG_4435.png" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '30px' }}>
            <Grid.Column computer={3}>
              <Image className="project-team-page-image" src="/content/images/project-team/_MG_4476.png" />
            </Grid.Column>
            <Grid.Column computer={5}>
              <h1 id="costis" className="project-team-page-title">
                Κωνσταντίνος Πιερίδης
              </h1>
              <h2 className="project-team-page-subtitle">Επιστημονικός σύμβουλος</h2>
              <p className="project-team-page-description">
                Είναι διδάκτωρ του τμήματος Πολιτικής Επιστήμης και Ιστορίας του Παντείου Πανεπιστημίου. Η έρευνά του εστιάζεται στην μελέτη
                των κοινωνικών διαιρετικών τομών της ύστερης Μεταπολίτευσης (2004-2014). Είναι επίσης κάτοχος μεταπτυχιακού τίτλου σπουδών
                (Msc) στην Ευρωπαϊκή Πολιτική και Διακυβέρνηση από το London School of Economics. Στο παρελθόν έχει εργαστεί ως εξωτερικός
                συνεργάτης / ερευνητής του ΕΚΚΕ στα πλαίσια του έργου «Δυναμική Διαχείριση Βάσεων Κοινωνικών Δεδομένων και Χαρτογραφικών
                Αναπαραστάσεων - Καλειδοσκόπιο Κοινωνικών Δεδομένων», ως ερευνητής και πολιτικός αναλυτής για την εταιρεία Κοινωνικών και
                Πολιτικών Ερευνών Public Issue, ως ερευνητής / αναλυτής στην εταιρεία ερευνών αγοράς Alternative Research Solutions και ως
                συντάκτης σε εφημερίδες, περιοδικά και ιστοσελίδες. Τα επιστημονικά και ερευνητικά του ενδιαφέροντα αφορούν τη θεωρία των
                διαιρετικών τομών, την εκλογική συμπεριφορά, τα πολιτικά κόμματα και τα κοινωνικά κινήματα.
              </p>
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
  showSidebar,
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTeam);