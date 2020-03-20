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
              νέων
              <span className="bold">που γεννήθηκαν μεταξύ των ετών 1991-2003</span> και συνεπώς βρίσκονται στο ηλικιακό εύρος των{' '}
              <span className="bold">17-29 ετών</span>. Η συλλογή των δεδομένων γίνεται διαδικτυακά ενώ για τις ανάγκες της έρευνας
              δημιουργήθηκε μία ψηφιακή εφαρμογή συλλογής δεδομένων με τη χρήση chat bot.
            </p>
          </Container>
        </div>
        <Container>
          <Image
            src="content/images/YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Η-γιαγιά-Bubbles-Έρευνα-Νέων-Erevna-Neon-Γιουχου Έρευνα.png"
            style={{
              margin: '-35vh 0 4vh 0'
            }}
          />
          <p className="young-adults-page-text">
            Όποιος/α συμμετέχει στο <NavLink to="/survey-chat">YouWho?</NavLink> ξαφνιάζεται ευχάριστα καθώς εισέρχεται σε ένα περιβάλλον
            chat όπου μια γνώριμη και αγαπητή στις ζωές των περισσότερων από εμάς φιγούρα περιμένει να τον υποδεχθεί. Πρόκειται για μια
            γιαγιά η οποία <span className="bold">ζητά από τους νέους να τη βοηθήσουν ώστε να τους κατανοήσει καλύτερα</span>.
          </p>
          <p className="young-adults-page-text">
            Μετά την ολοκλήρωση του ερωτηματολογίου κάθε ένας και κάθε μια που το συμπληρώνει μπορεί να δει{' '}
            <span className="bold">τα αποτελέσματα για το προφίλ του</span> με βάση τρία συνθετικά δίπολα που αντλούν πληροφορίες από
            απαντήσεις σε συγκεκριμένες ερωτήσεις. Παράλληλα, <span className="bold">μπορεί να συγκρίνει το προφίλ του</span> με τα
            συγκεντρωτικό αποτέλεσμα όσων έχουν ήδη συμπληρώσει το ερωτηματολόγιο.
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
                  Αν είσαι 17 -29 ετών παρακάτω θα βρεις ορισμένες <span className="red">ερωτήσεις</span> που πιστεύουμε ότι απαντούν σε όλα
                  όσα θα ήθελες να γνωρίζεις για τη συμμετοχή σου!
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
              να χτίσει με τη βοήθειά σου το πορτρέτο μιας ολόκληρης γενιάς ανθρώπων που βρίσκονται σε ηλικία μεταξύ 17 και 29 ετών
            </span>
            . Επιστήμονες διαφορετικών γνωστικών πεδίων και ειδικοτήτων όπως{' '}
            <span className="bold">
              η κοινωνική ψυχολογία, η πολιτική επιστήμη, η κοινωνιολογία, η πληροφορική, το marketing και το graphic design
            </span>
            , συνεργάστηκαν προκειμένου να δημιουργηθεί η έρευνα YouWho? Περισσότερες πληροφορίες για την ομάδα έργου, μπορείς να βρεις{' '}
            <NavLink to="/menus/project-team">εδώ</NavLink>.
          </p>
          <p className="young-adults-page-text purple">2: Γιατί αξίζει να συμμετάσχω;</p>
          <p className="young-adults-page-text">
            Γιατί μέσα από τη συμμετοχή σου εκτός του ότι <span className="bold">θα λάβεις μια σκιαγράφηση του εαυτού σου</span> θα δεις και
            πού βρίσκεσαι στο <span className="bold">"χάρτη"</span> της γενιάς που ανήκεις. Παράλληλα ο τρόπος που σχεδιάσαμε το{' '}
            <NavLink to="/survey-chat">YouWho?</NavLink> πιστεύουμε πως θα σε κάνει να χαμογελάσεις λίγο παραπάνω!
          </p>
          <p className="young-adults-page-text purple">3: Σε ποια θέματα εστιάζει το YouWho?</p>
          <p className="young-adults-page-text">
            Εστιάζει σε θέματα που αφορούν στις{' '}
            <span className="bold">
              καθημερινές σου συνήθειες, στην προσωπικότητά σου, στη σχέση σου με την πολιτική, στον τρόπο πρόσληψης του έθνους
            </span>{' '}
            αλλά και <span className="bold">στις πολιτισμικές σου πρακτικές</span>. Σε κάθε περίπτωση{' '}
            <span className="bold">δεν υπάρχει σωστή και λάθος απάντηση</span> παρά μόνο αυτό που εκφράζει καλύτερα τις απόψεις σου, το
            ποιος -α είσαι <span className="bold">και το πώς αισθάνεσαι</span>.
          </p>
          <p className="young-adults-page-text purple">4: Πόσο χρόνο θα αφιερώσω μέσα από τη συμμετοχή μου;</p>
          <p className="young-adults-page-text">
            Περίπου <span className="bold">15 λεπτά</span> είναι ο χρόνος που θα αφιερώσεις και έχουμε χρονομετρήσει αρκετούς εθελοντές
            συνομηλίκους σου προκειμένου να σου παρουσιάσουμε αυτόν τον αριθμό! Έχουμε φροντίσει επίσης η παραμονή σου στο{' '}
            <NavLink to="/survey-chat">YouWho?</NavLink> να είναι πολύ πιο ευχάριστη απ’ ό,τι ίσως αναμένεις.
          </p>
          <p className="young-adults-page-text purple">5: Είναι ανώνυμη η συμμετοχή μου;</p>
          <p className="young-adults-page-text">
            <span className="bold">Απόλυτα ανώνυμη και εμπιστευτική</span>. Δε ζητάμε και δεν καταγράφουμε{' '}
            <span className="bold">κανένα αναγνωριστικό στοιχείο</span> όπως ονοματεπώνυμο ή e-mail και σε όλα τα στάδια σχεδιασμού και
            υλοποίησης του <NavLink to="/survey-chat">YouWho?</NavLink>{' '}
            <span className="bold">ακολουθείται η πολιτική προστασίας προσωπικών δεδομένων</span> που έχει υιοθετηθεί από το Εθνικό Κέντρο
            Κοινωνικών Ερευνών. Στο ίδιο πλαίσιο ακολουθούνται οι κανόνες που ορίζονται από το Γενικό Κανονισμό Προστασίας Προσωπικών
            Δεδομένων. Επίσης, καμία από τις απαντήσεις που επιλέγεις στο YouWho? δεν κοινοποιείται σε τρίτους και{' '}
            <span className="bold">η παρουσίαση των αποτελεσμάτων θα περιλαμβάνει τη συνολική εικόνα όλων όσων συμμετείχαν</span> στο
            YouWho? <span className="bold">και χτίσανε μαζί</span> το πορτρέτο της γενιάς τους.
          </p>
          <p className="young-adults-page-text purple">6: Πώς μπορώ να συμμετάσχω;</p>
          <p className="young-adults-page-text">
            Κάνοντας κλικ <NavLink to="/survey-chat">εδώ</NavLink> !
          </p>
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
