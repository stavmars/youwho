import './news.scss';
import React from 'react';
import { Container, Image, Grid } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const News1 = () => (
  <div className="news-page" style={{ marginTop: '12vh' }}>
    <Container>
      <Grid centered>
        <Grid.Row>
          <h1 className="news-page-h1">Είσαι 17-29 ετών; Τότε αυτή η έρευνα σε αφορά!</h1>
          <p className="news-page-p">
            Είσαι 17-29 ετών; Έχεις διαμορφώσει τις αξίες σου, πιστεύεις κι ακολουθείς μια ιδεολογία, γνωρίζεις την έννοια του καλού - ή μη-
            πολίτη, υπάρχουν πράγματα που αγαπάς και μερικά που αποφεύγεις;{' '}
            <span className="bold">Η προσωπικότητά σου είναι πολυδιάστατη</span>, όπως πολυδιάστατη είναι και η ζωή! Αν θέλεις κι εσύ να
            λάβεις μια σκιαγράφηση του εαυτού σου και να δεις πού... βρίσκεσαι στο "χάρτη" της γενιάς σου σε σχέση με εκατοντάδες άλλους
            συνομιλήκους σου, τότε το
            <a href="https://www.ekke.gr/" target="_blank">
              {' '}
              Εθνικό Κέντρο Κοινωνικών Ερευνών
            </a>{' '}
            είναι κοντά σου.
          </p>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column verticalAlign="middle">
            <Image src="/content/images/news1.png" spaced="right" as={Link} to="/" />
          </Grid.Column>
          <Grid.Column>
            <p className="news-page-p">
              Ενηλικιώθηκες, ωρίμασες, εξελίχθηκες μέσα από προσωπικά βιώματα αλλά και κοινωνικά - πολιτικά ζητήματα που σχημάτισαν το
              σήμερα. Κι αφού βγήκες "αλώβητος -η", ήρθε η ώρα{' '}
              <span className="bold">να παρουσιάσεις εσύ σε εμάς όλα όσα σε διαμόρφωσαν.</span>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Με έναν <span className="bold">ανατρεπτικό</span> τρόπο - που θα ανακαλύψεις μέσα από τη συμμετοχή σου στην έρευνα - θα
            γνωρίσεις τις αξίες, τις πολιτικές τοποθετήσεις, τις ιδεολογικές ταυτίσεις, το πώς ορίζεις την έννοια του καλού πολίτη, τον
            τρόπο ζωής και πολλές ακόμη πτυχές του εαυτού σου.
          </p>
          <Image src="content/images/bubble-pink-landing.png" as={Link} to="/survey-chat" spaced="left" style={{ width: '200px' }} />
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Στόχος της έρευνάς μας είναι να μελετήσουμε <span className="bold">διεπιστημονικά</span> και με καινοτόμες μεθοδολογικές
            προσεγγίσεις
            <span className="bold"> την ταυτότητα των νέων στην Ελλάδα από 17-29 ετών</span>, εστιάζοντας στη σχέση σας με την πολιτική, τον
            τρόπο πρόσληψης του έθνους, τις καθημερινές συνήθειες (lifestyle), τις πολιτισμικές πρακτικές, αλλά και την προσωπικότητά σας.
          </p>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            <NavLink to="/menus/project-team">Επιστήμονες</NavLink> από διαφορετικά γνωστικά πεδία και ειδικότητες, όπως η κοινωνική
            ψυχολογία, η πολιτική επιστήμη, η επικοινωνία και το μάρκετινγκ, η γραφιστική και η πληροφορική συνεργαστήκαμε με έναν κοινό
            στόχο:
          </p>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Να δημιουργήσουμε ένα ερευνητικό εργαλείο που θα απευθύνεται με <span className="bold">αμεσότητα</span> σε όλους και όλες εσάς
            και θα καταγράφει τους επιμέρους παράγοντες που συνθέτουν την πολυδιάστατη εικόνα της γενιάς σας.
            <br />
            <br />
            <span className="bold">Μιας γενιάς όπως είναι.</span>
            <br />
            <br />
            <span className="bold">Χωρίς στερεοτυπικές προσεγγίσεις και χαρακτηριστικά.</span>
          </p>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Η συμμετοχή σου είναι ανώνυμη και δεν απαιτείται κανένα είδος εγγραφής ή αναγνωριστικού στοιχείου. Τα συνολικά αποτελέσματα θα
            είναι <span className="bold">ανοικτά </span>
            στην κοινωνία, στην <span className="bold">ακαδημαϊκή</span> και <span className="bold">ερευνητική</span> κοινότητα
            αναδεικνύοντας ένα αντιπροσωπευτικό
            <span className="bold"> προτρέτο</span> της γενιάς σου.
          </p>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            <span className="bold">Let’s keep in touch!</span> Θα μας βρεις και στα social media:
            <a href="https://www.facebook.com/YouWho.gr/" target="_blank">
              {' '}
              Facebook
            </a>{' '}
            και{' '}
            <a href="https://www.instagram.com/youwho.gr/" target="_blank">
              Instagram
            </a>
            .
          </p>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Λίγα λόγια για το{' '}
            <a href="https://www.ekke.gr/" target="_blank">
              Εθνικό Κέντρο Κοινωνικών Ερευνών
            </a>
            <br />
            <br />
            Το Εθνικό Κέντρο Κοινωνικών Ερευνών μετρά 60 ολόκληρα χρόνια στην Ελλάδα από την ημέρα της σύστασής του και αποτελεί το μοναδικό
            δημόσιο ερευνητικό κέντρο στην Ελλάδα για τις κοινωνικές επιστήμες. Διεξάγει έρευνες σε εθνικό και διεθνές επίπεδο συνεργασιών,
            υποστηρίζει θεσμικούς φορείς με εμπειρογνωμοσύνες, εκδίδει ακαδημαϊκό περιοδικό και διαθέτει υποδομές ανοιχτής πρόσβασης στο
            κοινό.
          </p>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
);

export default News1;
