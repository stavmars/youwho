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
            Είσαι 17-29 ετών; Έχεις διαμορφώσει τις <span className="bold">αξίες</span> σου; Πιστεύεις μια{' '}
            <span className="bold">ιδεολογία</span>; Πώς νομίζεις ότι είναι ο <span className="bold">καλός πολίτης</span>; Υπάρχουν{' '}
            <span className="bold">πράγματα που αγαπάς και μερικά που αποφεύγεις</span>;
            <br />
            <br />Η προσωπικότητά σου είναι <span className="bold">πολυδιάστατη</span>, όπως πολυδιάστατη είναι και η ζωή!
          </p>
          <p className="news-page-p">
            Αν θέλεις κι εσύ να λάβεις μια <span className="bold">σκιαγράφηση του εαυτού σου</span> και να δεις{' '}
            <span className="bold">πού... βρίσκεσαι στο "χάρτη" της γενιάς σου</span> σε σχέση με <span className="bold">εκατοντάδες</span>{' '}
            άλλους <span className="bold">συνομηλίκους</span> σου, τότε το
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
              Επιστήμονες από διαφορετικά γνωστικά πεδία και ειδικότητες, όπως η <span className="bold">κοινωνική ψυχολογία</span>, η{' '}
              <span className="bold">πολιτική επιστήμη</span>, η <span className="bold">επικοινωνία</span> και το{' '}
              <span className="bold">μάρκετινγκ</span>, η <span className="bold">γραφιστική</span> και η{' '}
              <span className="bold">πληροφορική</span> συνεργαστήκαμε και δημιουργήσαμε ένα on-line ερευνητικό εργαλείο που το ονομάσαμε{' '}
              <NavLink to="/">YouWho?</NavLink>.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p">
            Με έναν... <span className="bold">ανατρεπτικό</span> τρόπο - που θα ανακαλύψεις μέσα από τη συμμετοχή σου - και σε 10-15’{' '}
            <span className="bold">θα γνωρίσεις λίγο καλύτερα τον εαυτό σου</span> αλλά και <span className="bold">πόσο</span> τελικά
            ταυτίζεσαι με εκατοντάδες άλλους συνομηλίκους σου που έχουν λάβει ήδη μέρος.
          </p>
          <Image src="content/images/bubble-pink-landing.png" as={Link} to="/survey-chat" spaced="left" style={{ width: '200px' }} />
        </Grid.Row>
        <Grid.Row>
          <p className="news-page-p" style={{ textAlign: 'center' }}>
            Στόχος της έρευνάς μας η οποία είναι ανώνυμη, είναι να μελετήσουμε διεπιστημονικά τους επιμέρους{' '}
            <span className="bold">παράγοντες</span> που διαμορφώνουν την <span className="bold">ταυτότητα</span> των νέων στην Ελλάδα και
            να συνθέσουμε μαζί το <span className="bold">πορτρέτο</span> της γενιάς σου!
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
          <p className="news-page-p" style={{ textAlign: 'center' }}>
            Λίγα λόγια για το{' '}
            <a href="https://www.ekke.gr/" target="_blank">
              Εθνικό Κέντρο Κοινωνικών Ερευνών
            </a>
            <br />
            <br />
            Το Εθνικό Κέντρο Κοινωνικών Ερευνών μετρά <span className="bold">60 ολόκληρα χρόνια</span> στην Ελλάδα από την ημέρα της
            σύστασής του και αποτελεί το μοναδικό δημόσιο ερευνητικό κέντρο στην Ελλάδα για τις κοινωνικές επιστήμες. Διεξάγει έρευνες σε
            εθνικό και διεθνές επίπεδο συνεργασιών, υποστηρίζει θεσμικούς φορείς με εμπειρογνωμοσύνες, εκδίδει ακαδημαϊκό περιοδικό και
            διαθέτει υποδομές ανοικτής πρόσβασης στο κοινό.
          </p>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
);

export default News1;
