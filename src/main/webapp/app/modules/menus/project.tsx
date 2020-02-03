import './project.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Container } from 'semantic-ui-react';

export interface IProjectProps extends StateProps, DispatchProps {}

export class Project extends React.Component<IProjectProps> {
  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    return (
      <Container className="project-page">
        <h1 className="project-page-title">Το έργο</h1>
        <br />
        <h2 className="project-page-subtitle">Γενικά</h2>
        <br />
        <div className="project-page-content">
          Το 2017 το Λεξικό της Οξφόρδης ανακήρυξε ως λέξη της χρονιάς την λέξη «
          <a href="https://en.oxforddictionaries.com/word-of-the-year/word-of-the-year-2017" target="_blank">
            youthquake
          </a>
          ». Ως «νεανικός σεισμός» ορίζεται κάθε σημαντική πολιτισμική, πολιτική ή κοινωνική μεταβολή που προκύπτει μέσα από τις ενέργειες ή
          την επίδραση των νέων ανθρώπων. Δεν χωρά συνεπώς αμφιβολία ότι η δεύτερη δεκαετία του 21ου αιώνα συνοδεύεται από ένα αυξανόμενο
          ενδιαφέρον για τους νέους ως αντικείμενο μελέτης. Ιδιαίτερα μετά το ξέσπασμα της παγκόσμιας χρηματοπιστωτικής κρίσης το 2008 και
          τις καταγραφόμενες κοινωνικο-δημογραφικές μεταβολές στην νέες ηλικίες (την πρώτη γενιά ιστορικά που συνδυάζει υψηλό μορφωτικό
          επίπεδο με υψηλή ανεργία και απορρύθμιση των εργασιακών της σχέσεων) η επιστημονική έρευνα στρέφει το βλέμμα της στους νέους με
          ανανεωμένο ενδιαφέρον.
        </div>
        <br />
        <h2 className="project-page-subtitle">Στόχος</h2>
        <br />
        <p className="project-page-content">
          Βασικός στόχος του έργου είναι να μελετήσει διεπιστημονικά και με καινοτόμες μεθοδολογικές προσεγγίσεις την ταυτότητα των νέων
          στην Ελλάδα του 21ου αιώνα εστιάζοντας στη σχέση τους με την πολιτική, τον τρόπο πρόσληψης του έθνους, τις καθημερινές τους
          συνήθειες (lifestyle), τις πολιτισμικές τους πρακτικές, αλλά και την προσωπικότητά τους. Επιδιώκεται, όχι μόνο η συμβολή σε ένα
          δημόσιο διάλογο που αφορά τα βασικά χαρακτηριστικά της νέας γενιάς, αλλά η αναγνώριση επιμέρους χαρακτηριστικών των νέων με μια
          πολυδιάστατη οπτική, η οποία αποφεύγει την τακτική της στερεοτυπικής ανάδυσης κυρίαρχων χαρακτηριστικών και επικεντρώνεται στην
          ανάδειξη όλων των επιμέρους παραγόντων που συνθέτουν μια πολυμορφική εικόνα της νέας γενιάς.
        </p>
        <br />
        <h2 className="project-page-subtitle">Μεθοδολογία</h2>
        <br />
        <p className="project-page-content">
          3 έρευνες πεδίου σε διαφορετικό νεανικό πληθυσμό, 2 διαφορετικές μέθοδοι συλλογής δεδομένων (face – to – face/online survey).
        </p>
        <br />
        <h2 className="project-page-subtitle">Χρηματοδότηση</h2>
        <br />
        <p className="project-page-content">
          Το έργου υλοποιείται στο πλαίσιο της Πράξης «
          <a
            target="_blank"
            href="https://www.ekke.gr/research/project/ereuna-ekpaideusi-kai-ipodomes-o-trigonismos-ton-axonon-stratigikis-anaptixis-tou-ekke-redi"
          >
            Έρευνα, Εκπαίδευση και Υποδομές: ο τριγωνισμός των αξόνων στρατηγικής ανάπτυξης του ΕΚΚΕ - REDI
          </a>
          » (MIS 5002378) που εντάσσεται στη «Δράση Στρατηγικής Ανάπτυξης Ερευνητικών και Τεχνολογικών Φορέων» και χρηματοδοτείται από το
          Επιχειρησιακό Πρόγραμμα «Ανταγωνιστικότητα, Επιχειρηματικότητα και Καινοτομία» στο πλαίσιο του ΕΣΠΑ 2014-2020, με τη
          συγχρηματοδότηση της Ελλάδας και της Ευρωπαϊκής Ένωσης (Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης).
        </p>
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
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
