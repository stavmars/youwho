import './young-adults.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Container, Grid, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

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
              Η έρευνα <NavLink to="/survey-chat">YouWho?</NavLink> στοχεύει στη διερεύνηση των πολιτικών και κοινωνικών χαρακτηριστικών των
              νέων <span className="bold">που γεννήθηκαν μεταξύ των ετών 1991-2003</span> και συνεπώς βρίσκονταν στο ηλικιακό εύρος των{' '}
              <span className="bold">17-29 ετών</span> κατά την περίοδο διεξαγωγής της. Η συλλογή των δεδομένων έγινε διαδικτυακά κατά την
              περίοδο 17/2 - 5/3/2020 ενώ χιλιάδες νέοι και νέες έλαβαν μέρος. Για τις ανάγκες της έρευνας δημιουργήθηκε μία ψηφιακή
              εφαρμογή συλλογής δεδομένων με τη χρήση chat bot σε αυτόν τον ιστότοπο.
            </p>
          </Container>
        </div>
        <Container>
          <Image
            src="content/images/YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Η-γιαγιά-Έρευνα-Νέων-Erevna-Neon-Γιουχου-17-29.png"
            style={{
              margin: '-35vh 0 4vh 0'
            }}
          />
          <p className="young-adults-page-text">
            Οι συμμετέχοντες αλληλεπιδρούσαν μέσα σε ένα περιβάλλον chat με μια γνώριμη και αγαπητή φιγούρα. Μια γιαγιά, που ζητούσε από
            τους νέους να τη βοηθήσουν να τους κατανοήσει καλύτερα.
          </p>
          <p className="young-adults-page-text">
            Μετά την ολοκλήρωση του ερωτηματολογίου καθένας και καθεμία, μπορούσε να δει τα αποτελέσματα για το προφίλ του -ης με βάση τρία
            συνθετικά δίπολα που αντλούσαν πληροφορίες από απαντήσεις σε συγκεκριμένες ερωτήσεις. Παράλληλα, μπορούσε να συγκρίνει το προφίλ
            του -ης με τα συγκεντρωτικό αποτέλεσμα όσων είχαν ήδη συμπληρώσει το ερωτηματολόγιο.
          </p>
          <br />
          <br />
          <br />
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column computer={4} mobile={6} verticalAlign="middle">
                <Image src="content/images/YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-820X312-2 Speech-Bubbles-Έρευνα-Νέων-Erevna-Neon-Γιουχου Έρευνα.png" />
              </Grid.Column>
              <Grid.Column computer={12} mobile={10} verticalAlign="middle">
                <p className="young-adults-page-text purple">
                  Παρακάτω θα βρείτε σύντομες απαντήσεις σε ερωτήματα που αφορούν στην έρευνα YouWho?
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <br />
          <br />
          <p className="young-adults-page-text purple">1: Ποιος διεξάγει την Έρευνα YouWho? ;</p>
          <p className="young-adults-page-text">
            Το{' '}
            <a href="https://www.ekke.gr/" target="_blank">
              Εθνικό Κέντρο Κοινωνικών Ερευνών
            </a>{' '}
            που αποτελεί εδώ και 60 χρόνια,
            <span className="bold">το μοναδικό ερευνητικό κέντρο</span> Δημοσίου Δικαίου για τις κοινωνικές επιστήμες στην Ελλάδα
            δημιούργησε αυτή την έρευνα προκειμένου{' '}
            <span className="bold">
              να χτίσει με τη βοήθειά των νέων το πορτρέτο μιας ολόκληρης γενιάς ανθρώπων που βρίσκονται σε ηλικία μεταξύ 17 και 29 ετών
            </span>
            . Επιστήμονες διαφορετικών γνωστικών πεδίων και ειδικοτήτων όπως{' '}
            <span className="bold">
              η κοινωνική ψυχολογία, η πολιτική επιστήμη, η κοινωνιολογία, η πληροφορική, το marketing και το graphic design
            </span>
            , συνεργάστηκαν προκειμένου να δημιουργηθεί η έρευνα YouWho? Περισσότερες πληροφορίες για την ομάδα έργου, μπορείς να βρεις{' '}
            <NavLink to="/menus/project-team">εδώ</NavLink>.
          </p>
          <p className="young-adults-page-text purple">2: Ποιος είναι ο στόχος της έρευνας YouWho?</p>
          <p className="young-adults-page-text">
            Η έρευνα YouWho? αποτελεί μέρος ενός μεγαλύτερου <NavLink to="/menus/project">έργου</NavLink> του{' '}
            <a href="https://www.ekke.gr/" target="_blank">
              Εθνικού Κέντρου Κοινωνικών Ερευνών
            </a>{' '}
            που μελετά διεπιστημονικά την ταυτότητα των νέων στην Ελλάδα και εστιάζει σε θέματα που αφορούν στις καθημερινές συνήθειες των
            νέων, στην προσωπικότητά τους, στη σχέση τους με την πολιτική, στον τρόπο πρόσληψης του έθνους αλλά και στις πολιτισμικές τους
            πρακτικές. Ευρύτερος στόχος, είναι να καταγράψει τους πολλαπλούς παράγοντες που συνθέτουν την πολυδιάστατη εικόνα των νέων.
          </p>
          <p className="young-adults-page-text purple">3: Ήταν ανώνυμη η συμμετοχή στην έρευνα;</p>
          <p className="young-adults-page-text">
            Απόλυτα ανώνυμη και εμπιστευτική. Δε ζητήθηκε και δεν καταγράφηκε κανένα αναγνωριστικό στοιχείο, όπως ονοματεπώνυμο ή e-mail. Σε
            όλα τα στάδια σχεδιασμού και υλοποίησης του <NavLink to="/">YouWho?</NavLink> ακολουθείται η πολιτική προστασίας προσωπικών
            δεδομένων που έχει υιοθετηθεί από το{' '}
            <a href="https://www.ekke.gr/" target="_blank">
              Εθνικό Κέντρο Κοινωνικών Ερευνών
            </a>
            . Στο ίδιο πλαίσιο ακολουθούνται οι κανόνες που ορίζονται από το Γενικό Κανονισμό Προστασίας Προσωπικών Δεδομένων. Βάσει της
            ανωνυμίας της έρευνας, καμία από τις απαντήσεις που επέλεξαν οι συμμετέχοντες στο YouWho? δε δύναται να κοινοποιηθεί με κάποιο
            αναγνωριστικό της ταυτότητάς τους σε τρίτους και η παρουσίαση των αποτελεσμάτων θα περιλαμβάνει τη συνολική εικόνα όλων όσων
            συμμετείχαν στο YouWho? και χτίσανε μαζί το πορτρέτο της γενιάς τους.
          </p>
          <p className="young-adults-page-text purple">4: Τα αναλυτικά αποτελέσματα πότε και πού θα ανακοινωθούν;</p>
          <p className="young-adults-page-text">
            Η επιστημονική ομάδα του έργου εργάζεται πάνω στην ανάλυση των δεδομένων της έρευνας YouWho? προκειμένου να τα παρουσιάσει
            ανοικτά στο ευρύ κοινό. Στόχος μας είναι να παρουσιάσουμε στο ευρύ κοινό, την ακαδημαϊκή κοινότητα και όσους φορείς εμπλέκονται
            με τους νέους τους επιμέρους παράγοντες που συνθέτουν την πολυδιάστατη εικόνα τους. Παράλληλα τα δεδομένα δύναται να
            υποστηρίξουν και να ενισχύσουν ευρύτερα τόσο την κοινωνική έρευνα όσο και το δημόσιο διάλογο.
          </p>
          <p className="young-adults-page-text purple">5: Μπορεί κάποιος να έχει πρόσβαση στα αποτελέσματα;</p>
          <p className="young-adults-page-text">
            Φυσικά. Τα αποτελέσματα θα αναρτώνται σταδιακά όσο θα προχωρά η ανάλυσή τους από την επιστημονική ομάδα και ο καθένας θα μπορεί
            να έχει πρόσβαση σε αυτά μέσω αυτού του ιστοτόπου στη σελίδα <NavLink to="/results/average">“Συνολικά Αποτελέσματα”</NavLink>.
          </p>
          <p className="young-adults-page-text purple">6: Μπορεί κάποιος που είναι από 17-29 ετών πλέον να συμμετάσχει;</p>
          <p className="young-adults-page-text">
            Όχι, καθώς η έρευνα έκλεισε στις 5 Απριλίου 2020. Μπορεί ωστόσο να μας ακολουθήσει στα social media και να ενημερώνεται για όλες
            τις ενέργειες της επιστημονικής ομάδας.
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
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
