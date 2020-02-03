/* tslint:disable:no-submodule-imports */
/* tslint:disable:max-line-length */
import './students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container, Grid } from 'semantic-ui-react';
import { NavHashLink } from 'react-router-hash-link';
import chart2 from '../../../../resources/students-highlights/chart-2.json';
import chart3 from '../../../../resources/students-highlights/chart-3.json';
import chart4 from '../../../../resources/students-highlights/chart-4.json';
import chart5 from '../../../../resources/students-highlights/chart-5.json';
import chart6 from '../../../../resources/students-highlights/chart-6.json';
import chart7 from '../../../../resources/students-highlights/chart-7.json';
import chart8 from '../../../../resources/students-highlights/chart-8.json';
import chart9 from '../../../../resources/students-highlights/chart-9.json';
import chart10 from '../../../../resources/students-highlights/chart-10.json';
import chart11 from '../../../../resources/students-highlights/chart-11.json';
import chart12 from '../../../../resources/students-highlights/chart-12.json';

const HighlightsSubTitle = (subtitle: string) => (
  <Grid style={{ margin: '2vh 0' }}>
    <Grid.Column width={1}>
      <div className="vertical-line" />
    </Grid.Column>
    <Grid.Column computer={7} mobile={13}>
      <p className="students-page-important">{subtitle}</p>
    </Grid.Column>
  </Grid>
);

const Chart = (options: any, subtext: string) => (
  <Grid.Row style={{ margin: '2vh 0' }}>
    <Grid.Column computer={10} mobile={14}>
      <HighchartsReact options={options} highcharts={Highcharts} />
    </Grid.Column>
    <Grid.Column computer={4} mobile={14} verticalAlign="middle">
      <p className="students-page-text">
        <div dangerouslySetInnerHTML={{ __html: subtext }} />
      </p>
    </Grid.Column>
  </Grid.Row>
);

export interface IStudentsProps extends StateProps, DispatchProps {}

export class Students extends React.Component<IStudentsProps> {
  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    return (
      <div className="students-page">
        <div className="students-page-top">
          <Container>
            <h1 className="students-page-top-title">Μαθητές</h1>
            <p className="students-page-top-subtext">
              Πολλές έρευνες συνηγορούν στο ότι οι βασικές πολιτικές προδιαθέσεις των ατόμων, που θα τους ακολουθούν μέχρι την ενηλικίωση,
              διαμορφώνονται στα χρόνια της εφηβείας (Prior, 2010, Russo & Stattin, 2017). Στο ίδιο πλαίσιο, και σε συνέχεια των παραπάνω,
              οι περισσότερες εμπειρικές μελέτες συνηγορούν στο ότι η οικογένεια είναι εκείνη που επιτελεί τον σημαντικότερο ρόλο στην
              πολιτική κοινωνικοποίηση των εφήβων κατά τα χρόνια αυτά (Hooghe & Boonen, 2015, Niemi & Helpburn, 1995, Verba et al., 1995).
              Ως εκ τούτου, η μελέτη της συγκεκριμένης ηλικιακής ομάδας έχει ξεχωριστό ενδιαφέρον. Για τις ανάγκες του έργου σχεδιάστηκε και
              υλοποιήθηκε την άνοιξη του 2018 ποσοτική έρευνα πεδίου με αυτο-συμπληρούμενο ερωτηματολόγιο σε επιλεγμένες σχολικές μονάδες
              της Αττικής, σε 792 μαθητές και μαθήτριες Γυμνασίου. Μέσω της έρευνας δόθηκε η δυνατότητα να σκιαγραφηθούν οι πολλαπλές
              πλευρές της ταυτότητας των εφήβων υπό το πρίσμα του φύλου, της ηλικίας και της κοινωνικής σύνθεσης της οικογένειας. Τμήμα των
              δεδομένων έχει ήδη αναρτηθεί στην πλατφόρμα{' '}
              <a href="https://socioscope.gr" target="_blank">
                Socioscope
              </a>
              , στην{' '}
              <a target="_blank" href="http://www.socioscope.gr/dataset/adolescents">
                σχετική θεματική
              </a>
              .
            </p>
          </Container>
        </div>
        <Container style={{ marginTop: '-60px' }}>
          <p className="students-page-text">
            Μερικά ερευνητικά αποτελέσματα για κάθε θεματική που φιλοξενείται στο{' '}
            <a href="https://socioscope.gr" target="_blank">
              Socioscope
            </a>{' '}
            μπορείτε να δείτε εδώ:
            <ul style={{ listStyleType: 'none', textAlign: 'center' }}>
              <li>
                <NavHashLink smooth to="#school" style={{ color: '#ff6666' }}>
                  ΣΧΟΛΕΙΟ
                </NavHashLink>
              </li>
              <li>
                <NavHashLink smooth to="#family" style={{ color: '#ff6666' }}>
                  ΟΙΚΟΓΕΝΕΙΑ
                </NavHashLink>
              </li>
              <li>
                <NavHashLink smooth to="#politics" style={{ color: '#ff6666' }}>
                  ΠΟΛΙΤΙΚΗ
                </NavHashLink>
              </li>
              <li>
                <NavHashLink smooth to="#nation" style={{ color: '#ff6666' }}>
                  ΕΘΝΟΣ
                </NavHashLink>
              </li>
              <li>
                <NavHashLink smooth to="#personality" style={{ color: '#ff6666' }}>
                  ΠΡΟΣΩΠΙΚΟΤΗΤΑ
                </NavHashLink>
              </li>
            </ul>
          </p>
          <Grid centered>
            <a id="school" className="anchor" />
            <h2 className="students-page-subtitle">ΣΧΟΛΕΙΟ</h2>
            {HighlightsSubTitle(
              'Οι μαθητές υιοθετούν σε σημαντικό βαθμό πρακτικές συμμόρφωσης, ενώ υποστηρίζουν σθεναρά τη συλλογική δράση στο σχολείο.'
            )}
            {Chart(
              chart2,
              'Το 58,3% των μαθητών συμφωνούν ότι <span style="font-family: TTNormsProBoldItalic;font-style: italic">«οι μαθητές/τριες πρέπει να ακολουθούν τις οδηγίες των καθηγητών ακόμα και όταν διαφωνούν με αυτές»</span>'
            )}
            {Chart(
              chart4,
              'Το 87,4% των μαθητών συμφωνούν ότι <span style="font-family: TTNormsProBoldItalic;font-style: italic">«οι μαθητές/τριες μπορούν να επηρεάσουν' +
                'ότι συμβαίνει στο σχολείο τους όταν δρουν όλοι/ες μαζί, παρά ο καθένας μόνος του»</span>'
            )}
            <a id="family" className="anchor" />
            <h2 className="students-page-subtitle">ΟΙΚΟΓΕΝΕΙΑ</h2>
            {HighlightsSubTitle(
              'Οι οικογενειακές συνήθειες στις οποίες αναφέρονται οι μαθητές διαφοροποιούν τον πατέρα από τη μητέρα.' +
                'Ο πατέρας παρακολουθεί ειδήσεις και προτιμούν να συζητούν μαζί του πολιτικά θέματα, ενώ η μητέρα διαβάζει βιβλία.'
            )}
            {Chart(
              chart5,
              'Το 62,8% των μαθητών δηλώνει ότι συχνά <span style="font-family: TTNormsProBoldItalic;font-style: italic">«ο πατέρας παρακολουθεί ειδήσεις»</span> και το 62,4% ότι συχνά <span style="font-family: TTNormsProBoldItalic;font-style: italic">«η μητέρα διαβάζει βιβλία»</span>'
            )}
            <a id="politics" className="anchor" />
            <h2 className="students-page-subtitle">ΠΟΛΙΤΙΚΗ</h2>
            {HighlightsSubTitle(
              'Η κυρίαρχη γνώμη των μαθητών για την ψήφο στα 17 εμφανίζεται αμφίθυμη, καθώς μοιράζεται μεταξύ αποδοχής και αδιαφορίας. Το ενδιαφέρον τους' +
                ' για την πολιτική είναι περιορισμένο. Για πολιτικά θέματα προτιμούν να συμβουλεύονται τον πατέρα τους. Οι περισσότεροι ' +
                'υποστηρίζουν την αλλαγή της ελληνικής κοινωνίας σταδιακά με μεταρρυθμίσεις.'
            )}
            {Chart(
              chart3,
              'Το 30,7% των μαθητών χαρακτηρίζει τη δυνατότητα να ψηφίζουν οι νέοι στα 17 ως <span style="font-family: TTNormsProBoldItalic;font-style: italic">«αδιάφορη»</span> και το 30,6% ως <span style="font-family: TTNormsProBoldItalic;font-style: italic">«μάλλον θετική»</span>.'
            )}
            {Chart(
              chart6,
              'Το 43,4% των μαθητών ενδιαφέρεται <span style="font-family: TTNormsProBoldItalic;font-style: italic">«λίγο»</span> για την πολιτική και το 6,3% ενδιαφέρεται <span style="font-family: TTNormsProBoldItalic;font-style: italic">«πολύ»</span>.'
            )}
            {Chart(
              chart7,
              'Το 66% των μαθητών θα προτιμούσε να <span style="font-family: TTNormsProBoldItalic;font-style: italic">«ρωτήσει τον πατέρα του/της για πολιτικά θέματα»</span>'
            )}
            {Chart(
              chart8,
              'Το 64,6% των μαθητών υποστηρίζει την αλλαγή της ελληνικής κοινωνίας <span style="font-family: TTNormsProBoldItalic;font-style: italic">«σιγά σιγά με μεταρρυθμίσεις»</span> και το 16,7% <span style="font-family: TTNormsProBoldItalic;font-style: italic">«ριζικά με επαναστατικά μέτρα»</span>'
            )}
            <a id="nation" className="anchor" />
            <h2 className="students-page-subtitle">ΕΘΝΟΣ</h2>
            {HighlightsSubTitle(
              'Η πλειοψηφία των μαθητών αναγνωρίζει την  επιθυμία του αυτοπροσδιορισμού ως το πιο σημαντικό χαρακτηριστικού του/της' +
                ' «πραγματικού/ής Έλληνα/ίδα». Η εθνική υπερηφάνεια συγκροτείται γύρω από την «ιστορία του τόπου», την «τέχνη και τη λογοτεχνία».'
            )}
            {Chart(
              chart9,
              'Το 61% των μαθητών υποστηρίζει ότι <span style="font-family: TTNormsProBoldItalic;font-style: italic">«πραγματικός Έλληνας/ίδα»</span> είναι εκείνος/η που <span style="font-family: TTNormsProBoldItalic;font-style: italic">«επιθυμεί να είναι Έλληνας/ίδα»</span> και ' +
                '<span style="font-family: TTNormsProBoldItalic;font-style: italic">«σέβεται τους θεσμούς της χώρας»</span> (54,5%)'
            )}
            {Chart(
              chart10,
              'Το 81,7% των μαθητών δηλώνουν υπερήφανοι <span style="font-family: TTNormsProBoldItalic;font-style: italic">«για την ιστορία του τόπου»</span> και το 56,3% <span style="font-family: TTNormsProBoldItalic;font-style: italic">«για τις επιτυχίες στην τέχνη και τη λογοτεχνία»</span>  '
            )}
            <a id="personality" className="anchor" />
            <h2 className="students-page-subtitle">ΠΡΟΣΩΠΙΚΟΤΗΤΑ</h2>
            {HighlightsSubTitle(
              'Οι περισσότεροι μαθητές δηλώνουν ότι είναι ικανοποιημένοι από διάφορες παραμέτρους στη ζωή τους, όμως η υψηλότερη ικανοποίηση αντλείται ' +
                'από την οικογένεια. Ως σημαντικότερες αξίες για τη ζωή τους αναγνωρίζουν τη φιλία και ένα επάγγελμα που τους ικανοποιεί, ' +
                'ενώ τα υλικά αγαθά ιεραρχούνται στην τελευταία θέση των αξιών.'
            )}
            {Chart(
              chart11,
              'Το 79,9% των μαθητών δηλώνει ικανοποιημένο <span style="font-family: TTNormsProBoldItalic;font-style: italic">«από το σπίτι»</span> του και το 76% από <span style="font-family: TTNormsProBoldItalic;font-style: italic">«τις σχέσεις με τους άλλους ανθρώπους»</span>'
            )}
            {Chart(
              chart12,
              'Το 95,7% των μαθητών αξιολογούν τη <span style="font-family: TTNormsProBoldItalic;font-style: italic">«φιλία»</span> ως τη σημαντικότερη αξία στη ζωή τους, το 89,8% το <span style="font-family: TTNormsProBoldItalic;font-style: italic">«επάγγελμα που ικανοποιεί τα ' +
                'ενδιαφέροντά»</span> τους και το 88,8% τις <span style="font-family: TTNormsProBoldItalic;font-style: italic">«αρμονικές οικογενειακές σχέσεις»</span>'
            )}
          </Grid>
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
)(Students);
