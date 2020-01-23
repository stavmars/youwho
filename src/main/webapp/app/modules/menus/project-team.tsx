import './project-team.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Image, Grid, Menu, Container, Responsive } from 'semantic-ui-react';
import { NavHashLink } from 'react-router-hash-link';

const MemberBio = (tag: string, title: string, subtitle: string, description: string, image: string, left: boolean) => (
  <Grid.Row style={{ marginTop: '30px' }}>
    <Grid.Column only="mobile">
      <Image className="project-team-page-image" src={image} circular />
    </Grid.Column>
    {left && (
      <Grid.Column computer={3} only="computer">
        <Image className="project-team-page-image" src={image} />
      </Grid.Column>
    )}
    <Grid.Column width={5}>
      <a id={tag} className="anchor" />
      <h1 className="project-team-page-title">{title}</h1>
      <h2 className="project-team-page-subtitle">{subtitle}</h2>
      <p className="project-team-page-description">{description}</p>
    </Grid.Column>
    {!left && (
      <Grid.Column computer={3} only="computer">
        <Image className="project-team-page-image" src={image} />
      </Grid.Column>
    )}
  </Grid.Row>
);

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
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Menu
            text
            fluid
            fixed="top"
            style={{
              background: 'transparent linear-gradient(133deg, #ffffff 0%, #e3e3e6 100%) 0% 0% no-repeat fixed',
              borderStyle: 'none',
              marginTop: '80px',
              paddingBottom: '40px'
            }}
          >
            <Menu.Item style={{ marginLeft: '30vw' }}>
              <NavHashLink isActive={this.isActive('#manina')} smooth to="#manina" replace={false}>
                <Image circular src="content/images/project-team/_MG_4451-1@2x.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#iliou')} smooth to="#iliou" replace={false}>
                <Image circular src="content/images/project-team/_MG_4402-2@2x.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#costis')} smooth to="#costis" replace={false}>
                <Image circular src="content/images/project-team/_MG_4476-1@2x.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#irene')} smooth to="#irene" replace={false}>
                <Image circular src="content/images/project-team/_MG_4435-1@2x.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#gpapas')} smooth to="#gpapas" replace={false}>
                <Image circular src="content/images/project-team/_MG_4570-1@2x.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#stavmars')} smooth to="#stavmars" replace={false}>
                <Image circular src="content/images/project-team/_MG_4557.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
            <Menu.Item>
              <NavHashLink isActive={this.isActive('#astgian')} smooth to="#astgian" replace={false}>
                <Image circular src="content/images/project-team/_MG_4532.png" style={{ width: '99px', height: '99px' }} />
              </NavHashLink>
            </Menu.Item>
          </Menu>
        </Responsive>
        <Responsive
          {...Responsive.onlyMobile}
          style={{
            textAlign: 'center',
            font: '40px/45px TTNormsProBoldItalic',
            letterSpacing: '0',
            color: '#333333',
            opacity: '1',
            paddingTop: '80px'
          }}
        >
          Ομάδα Έργου
        </Responsive>
        <Grid className="project-team-page" centered stackable>
          <Grid.Row>
            <h1 className="project-team-page-header">Οι Κοινωνικοί Επιστήμονες</h1>
          </Grid.Row>
          {MemberBio(
            'manina',
            'Μανίνα Κακεπάκη',
            'Επιστημονική συν-υπεύθυνη έργου (Πολιτική Επιστήμη)',
            'Εντεταλμένη Ερευνήτρια στο Εθνικό Κέντρο Κοινωνικών Ερευνών, στο αντικείμενο «Πολιτική Κουλτούρα και εκλογική συμπεριφορά». Έχει συμμετάσχει σε πάνω από 30 διεθνή και ελληνικά ερευνητικά προγράμματα ενώ τα τρέχοντα ερευνητικά της ενδιαφέροντα εστιάζονται στις πολιτικές ελίτ και τις ανισότητες στην πολιτική αντιπροσώπευση, στις έμφυλες σχέσεις καθώς και στην μελέτη της ταυτότητας των νέων. Μέσω της πλατφόρμας socioscope έχει εξειδικευθεί στην οπτικοποίηση και διάχυση των ερευνητικών αποτελεσμάτων ενώ διηύθυνε την πρώτη διαδικτυακή έρευνα που υλοποιήθηκε από το ΕΚΚΕ το 2017 με αντικείμενο την συγκριτική μελέτη αξιών σε Ελλάδα και Ουγγαρία.',
            'content/images/project-team/_MG_4451.png',
            true
          )}
          {MemberBio(
            'iliou',
            'Κατερίνα Ηλιού',
            'Επιστημονική συν-υπεύθυνη έργου (Κοινωνική Ψυχολογία)',
            'Εντεταλμένη Ερευνήτρια στο Εθνικό Κέντρο Κοινωνικών Ερευνών, στο αντικείμενο «Κοινωνική ψυχολογία: Κοινωνικός αποκλεισμός και διακρίσεις». Τα επιστημονικά της ενδιαφέροντα περιλαμβάνουν θέματα όπως προκατάληψη, ρατσισμός, πατριωτισμός, κοινωνική ταυτότητα, ταυτότητα νέων και κλίμακες μέτρησης στάσεων. Έχει συμμετάσχει στην εκπόνηση μελετών πεδίου σε πλαίσιο εθνικών και διεθνών προγραμμάτων και έχει πραγματοποιήσει δημοσιεύσεις και εισηγήσεις σε διεθνή συνέδρια. Είναι επιστημονική συν-υπεύθυνη του έργου.',
            'content/images/project-team/_MG_4402-1@2x.png',
            false
          )}
          {MemberBio(
            'costis',
            'Κωνσταντίνος Πιερίδης',
            'Επιστημονικός συνεργάτης (Πολιτική Επιστήμη)',
            'Διδάκτωρ του τμήματος Πολιτικής Επιστήμης και Ιστορίας του Παντείου Πανεπιστημίου με αντικείμενο μελέτης τις κοινωνικές διαιρετικές τομές της ύστερης Μεταπολίτευσης (2004-2014). Κάτοχος Msc στην Ευρωπαϊκή Πολιτική και Διακυβέρνηση από το London School of Economics. Έχει εργαστεί ως εξωτερικός συνεργάτης του ΕΚΚΕ στα πλαίσια του έργου «Δυναμική Διαχείριση Βάσεων Κοινωνικών Δεδομένων και Χαρτογραφικών Αναπαραστάσεων - Καλειδοσκόπιο Κοινωνικών Δεδομένων», ως ερευνητής και πολιτικός αναλυτής στον ιδιωτικό τομέα και ως δημοσιογράφος σε εφημερίδες, περιοδικά και ιστοσελίδες. Τα επιστημονικά και ερευνητικά του ενδιαφέροντα αφορούν τη θεωρία των διαιρετικών τομών, την εκλογική συμπεριφορά, τα πολιτικά κόμματα και τα κοινωνικά κινήματα.',
            'content/images/project-team/_MG_4476.png',
            true
          )}
          {MemberBio(
            'irene',
            'Ειρήνη Κυριαζοπούλου',
            'Επικοινωνιακός σχεδιασμός έργου (Marketing και επικοινωνία)',
            'Επικοινωνιολόγος και Marketer, πτυχιούχος του τμήματος ΕΜΜΕ του Πανεπιστημίου Αθηνών καθώς και κάτοχος MSc in Marketing and Communication από το Οικονομικό Πανεπιστήμιο Αθηνών με εξειδίκευση στο Marketing. Παράλληλα κατέχει το Professional Diploma in Digital & Social Media από το Αμερικάνικο Κολλέγιο Αθηνών. Στην επαγγελματική της εμπειρία συγκαταλέγονται η Εταιρική Επικοινωνία, η δημιουργία και διατήρηση μακροχρόνιων σχέσεων με πελάτες (B2B) και η δημιουργία στρατηγικών εισόδου νέων επιχειρήσεων στην αγορά. Τα επιστημονικά της ενδιαφέροντα αφορούν στο Marketing Υπηρεσιών, τη Συμπεριφορά Καταναλωτή online και offline καθώς και την επίδραση του Servicescape στην ικανοποίηση του καταναλωτή.  Ως μέλος της Ομάδας έργου του YouWho ανέλαβε τον επικοινωνιακό σχεδιασμό και την διαμόρφωση της στρατηγικής καμπάνιας στα social media της έρευνας YouWho.',
            'content/images/project-team/_MG_4435.png',
            false
          )}
          <Grid.Row>
            <Grid.Column computer={5}>
              <h1 className="project-team-page-header">Πρακτική άσκηση</h1>
              <p className="project-team-page-description">
                <span style={{ color: '#ff6666' }}>Διενέργεια έρευνας πεδίου</span>: Νίκος Κληρονόμος, Κατερίνα Πάσχου, Νίκος Σαριδάκης,
                Ιάκωβος Σαχίνης, Ανδρεάς Σιαφάκας.
              </p>
              <p className="project-team-page-description">
                <span style={{ color: '#ff6666' }}>Επεξεργασία δεδομένων</span>: Νικολέτα Γεωργίου, Μαρία Δουρίδα, Συμεών Ιωάννου, Δημήτρης
                Κάστανος, Παναγιώτης Σωπάκης - Βαλαλάκης.
              </p>
              <p className="project-team-page-description">
                <span style={{ color: '#ff6666' }}>Διαχείριση social media</span>: Μάρω Γιαννίκη
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <h1 className="project-team-page-header">Οι Μηχανικοί Υπολογιστών</h1>
          </Grid.Row>
          {MemberBio(
            'gpapas',
            'Γιώργος Παπαστεφανάτος',
            'Υπεύθυνος σχεδιασμού πλατφόρμας',
            'Διπλωματούχος μηχανικός της Σχολής Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Εθνικού Μετσόβιου Πολυτεχνείου (ΕΜΠ). Το 2009 αναγορεύτηκε Διδάκτωρ Μηχανικός στη Σχολή Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του ΕΜΠ, στην ερευνητική περιοχή των Βάσεων Δεδομένων και Πληροφοριακών Συστημάτων. Από το 2009 είναι ερευνητικός συνεργάτης στο Ινστιτούτο Πληροφοριακών Συστημάτων του Ε.Κ. "Αθηνά". Έχει εργαστεί ως μηχανικός λογισμικού και ερευνητής σε ερευνητικά προγράμματα του ΕΜΠ και του ΕΠΙΣΕΥ. Υπήρξε επιστημονικός υπεύθυνος εκ μέρους του Ε.Κ. ΑΘΗΝΑ στο έργο «Sodamap - Δυναμική διαχείριση βάσεων Κοινωνικών δεδομένων και Χαρτογραφικών αναπαραστάσεων», πρόσκληση “ΚΡΗΠΙΣ” της ΓΓΕΤ όπου σε συνεργασία με το Εθνικό Κέντρο Κοινωνικών Ερευνών υλοποίησαν την πλατφόρμα Καλειδοσκόπιο Κοινωνικών Δεδομένων (www.socioscope.gr).',
            'content/images/project-team/_MG_4570.png',
            true
          )}
          {MemberBio(
            'stavmars',
            'Σταύτος Μαρούλης',
            'Υπεύθυνος τεχνικής ανάπτυξης',
            'Διπλωματούχος μηχανικός και υποψήφιος διδάκτορας της Σχολής Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών του Εθνικού Μετσόβιου Πολυτεχνείου (ΕΜΠ). Από το 2014 είναι ερευνητικός συνεργάτης στο Ινστιτούτο Πληροφοριακών Συστημάτων του Ε.Κ. “Αθηνά” και έχει εργασθεί ως μηχανικός λογισμικού σε πολλά ευρωπαϊκά και ελληνικά ερευνητικά προγράμματα. Συμμετείχε στην ανάπτυξη της πλατφόρμας www.socioscope.gr για την οπτικοποίηση και ανάλυση κοινωνικών και πολιτικών δεδομένων, καθώς και της ψηφιακής πλατφόρμας YouWho για τη συλλογή και διάθεση δεδομένων αποτύπωσης της ταυτότητας των νέων.',
            'content/images/project-team/_MG_4557@2x.png',
            false
          )}
          {MemberBio(
            'astgian',
            'Αστέρης Γιαννούδης',
            'Πρακτική άσκηση',
            'Απόφοιτος του τμήματος Πληροφορικής και Τηλεπικοινωνιών του Πανεπιστημίου Αθηνών. Έκανε την πρακτική του στο Ερευνητικό Κέντρο Αθηνά με αντικείμενο τη μελέτη, το σχεδιασμό και την ανάπτυξη  μεθόδων επεξεργασίας και ανάλυσης μεγάλων δεδομένων στο Web. Στον ελεύθερο του χρόνο, πέραν του ενδιαφέροντος του στην πληροφορική, ασχολείται με την γυμναστική και τον αθλητισμό, καθώς είναι μέλος της ομάδας καλαθοσφαίρισης με αμαξίδιο της Α.Ε.Κ..',
            'content/images/project-team/_MG_4532@2x.png',
            true
          )}
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
