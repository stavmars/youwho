import './project.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar } from 'app/shared/reducers/header';
import { Container } from 'semantic-ui-react';

export interface IProjectProps extends StateProps, DispatchProps {}

export class Project extends React.Component<IProjectProps> {
  componentDidMount() {
    this.props.showSidebar();
  }

  render() {
    return (
      <Container className="project-page">
        <h1 className="project-page-title">Το έργο</h1>
        <br />
        <h2 className="project-page-subtitle">Γενικά</h2>
        <br />
        <p className="project-page-content">
          Στο πλαίσιο υλοποίησης του υποέργου «REDI – Αυτεπιστασία ΕΚΚΕ» της Πράξης «Έρευνα, Εκπαίδευση και Υποδομές: ο τριγωνισμός των
          αξόνων στρατηγικής ανάπτυξης του ΕΚΚΕ (REDI)» εντάσσονται τρεις ξεχωριστές έρευνες νεολαίας. Αντικείμενό τους είναι να
          σκιαγραφηθούν οι βασικοί ατομικοί και συλλογικοί παράγοντες προσδιορισμού της ταυτότητας του νεανικού πληθυσμού της χώρας και να
          αποτυπωθεί ο τρόπος που επιμέρους παράγοντες αλληλεπιδρούν στην διαμόρφωση τους. Ως πληθυσμός των τριών αυτών ερευνών ορίζονται οι
          νέοι ηλικίας 15-29 ετών, οι οποίοι οργανώνονται στη βάση επιμέρους κατατμήσεων τους σε εξελικτικό-ηλιακό επίπεδο σε δύο ηλικιακές
          κατηγορίες: τους εφήβους 13-15 ετών και τους νέους ενήλικες 18-29 ετών.
        </p>
        <br />
        <h2 className="project-page-subtitle">Έρευνα νεανικού πληθυσμού</h2>
        <br />
        <p className="project-page-content">
          Οι έρευνες νεανικού πληθυσμού αποτελούν μια ξεχωριστή κατηγορία των ερευνών κοινής γνώμης, καθώς στοχεύουν σε μια συγκεκριμένη
          ηλικιακή ομάδα. Η ομάδα αυτή συνήθως περιλαμβάνει άτομα από 18 έως 29 ετών (δηλαδή από την ενηλικίωση έως και το συμβολικό κατώφλι
          των 30 χρόνων). Η περίοδος της εφηβείας (13-17) αποτελεί συνήθως ξεχωριστό πεδίο μελέτης λόγω και των ιδιαίτερων θεσμικών και
          εξελικτικών χαρακτηριστικών των νέων αυτής της ηλικίας. Σε γενικές γραμμές, οι έρευνες νεανικού πληθυσμού έχουν ως αντικείμενο τις
          ιδεολογικές στάσεις, τις αντιλήψεις, τις αξίες, τον τρόπο ζωής, τις καθημερινές συνήθειες και τις αναζητήσεις της νέας γενιάς. Τα
          θέματα αυτά απασχόλησαν έντονα τους κοινωνικούς επιστήμονες ήδη από τη δεκαετία του 1960. Οι επαναλαμβανόμενες μελέτες στο νεανικό
          πληθυσμό ανέδειξαν τις διαφορές στις στάσεις και τις αντιλήψεις που αντανακλούν το κοινωνικο-πολιτικό πλαίσιο της κάθε εποχής.
          Έτσι, καθιερώθηκαν συγκεκριμένες τυπολογίες γενεών όπως οι Baby boomers (η μεταπολεμική γενιά) η γενιά Χ, οι Millennials και
          εσχάτως η γενιά G.
        </p>
        <br />
        <h2 className="project-page-subtitle">Βιβλιογραφία</h2>
        <br />
        <span className="project-page-content">
          Christoforou, Asimina. 2003. “Social Capital and Economic Growth: The Case of Greece.” In London.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Chtouris, Sotiris, Anastasia Zissi, Efstratios Papanis, and Konstantinos Rontos. 2006. “The State of Youth in Contemporary
          Greece.” YOUNG, Nordic Journal of Youth Research 14(4): 309–22.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Inglehart, Ronald, and Pippa Norris. 2016. Trump, Brexit, and the Rise of Populism: Economic Have-Nots and Cultural Backlash.
          Rochester, NY: Social Science Research Network. SSRN Scholarly Paper.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Karamichas, George. 2009. “The December 2008 Riots in Greece.” Social Movement Studies: 289–93.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Kornetis, Kostis. 2010. “No More Heroes? Rejection and Reverberation of the Past in the 2008 Events in Greece.” Journal of Modern
          Greek Studies 28(2): 173–97.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Kouki, Hara. 2009. “Where Do We Go from Here? December 2008 Riots in Greece and Social Movement Analysis.” In Florence: European
          University Institute.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Sotiris, Panagiotis. 2010. “Rebels with a Cause: The December 2008 Greek Youth Movement as the Condensation of Deeper Social and
          Political Contradictions.” International Journal of Urban and Regional Research 34(1): 203–9.
        </span>
        <br />
        <br />
        <br />
        <span className="project-page-content">
          Theocharis, Yannis. 2011. “Young People, Political Participation and Online Postmaterialism in Greece.” New Media & Society 13:
          203–23.
        </span>
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible
});

const mapDispatchToProps = {
  showSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
