/* tslint:disable:no-submodule-imports */
import './students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container, Grid } from 'semantic-ui-react';
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
      <p className="students-page-subtext">{subtext}</p>
    </Grid.Column>
  </Grid.Row>
);

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
              Πολλές έρευνες συνηγορούν στο ότι οι βασικές πολιτικές προδιαθέσεις των ατόμων, που θα τους ακολουθούν μέχρι την ενηλικίωση,
              διαμορφώνονται στα χρόνια της εφηβείας (Prior 2010, Russo and Stattin 2017). Στο ίδιο πλαίσιο, και σε συνέχεια των παραπάνω,
              οι περισσότερες εμπειρικές μελέτες συνηγορούν στο ότι η οικογένεια είναι εκείνη που επιτελεί τον σημαντικότερο ρόλο στην
              πολιτική κοινωνικοποίηση των εφήβων κατά τα χρόνια αυτά (Niemi and Hepburn 1995, Hooghe and Boonen 2015, Verba et al 1995). Ως
              εκ τούτου, η μελέτη της συγκεκριμένης ηλικιακής ομάδας έχει ξεχωριστό ενδιαφέρον.
            </p>
          </Container>
        </div>
        <Container style={{ marginTop: '-80px' }}>
          <h1 className="students-page-title">έρευνες νεανικού πληθυσμού</h1>
          <p className="students-page-subtext">
            Για τις ανάγκες του έργου σχεδιάστηκε και υλοποιήθηκε την άνοιξη του 2018 ποσοτική έρευνα πεδίου με αυτο-συμπληρούμενο
            ερωτηματολόγιο σε επιλεγμένες σχολικές μονάδες της Αττικής, σε 792 μαθητές και μαθήτριες Γυμνασίου. Μέσω της έρευνας δόθηκε η
            δυνατότητα να σκιαγραφηθούν οι πολλαπλές πλευρές της ταυτότητας των εφήβων υπό το πρίσμα του φύλου, της ηλικίας και της
            κοινωνικής σύνθεσης της οικογένειας.
          </p>
          <h1 className="students-page-title">Highlights</h1>
          <Grid centered>
            <h2 className="students-page-subtitle">ΣΧΟΛΕΙΟ</h2>
            {HighlightsSubTitle(
              'Οι μαθητές υιοθετούν σε σημαντικό βαθμό πρακτικές συμμόρφωσης, ενώ υποστηρίζουν σθεναρά τη συλλογική δράση στο σχολείο.'
            )}
            {Chart(
              chart2,
              'Το 58,3% των μαθητών συμφωνούν ότι «οι μαθητές/τριες πρέπει να ακολουθούν τις οδηγίες των καθηγητών ακόμα και όταν διαφωνούν με αυτές»'
            )}
            {Chart(
              chart4,
              'Το 87,4% των μαθητών συμφωνούν ότι «οι μαθητές/τριες μπορούν να επηρεάσουν' +
                'ότι συμβαίνει στο σχολείο τους όταν δρουν όλοι/ες μαζί, παρά ο καθένας μόνος του»'
            )}
            <h2 className="students-page-subtitle">ΟΙΚΟΓΕΝΕΙΑ</h2>
            {HighlightsSubTitle(
              'Οι οικογενειακές συνήθειες στις οποίες αναφέρονται οι μαθητές διαφοροποιούν τον πατέρα από τη μητέρα.' +
                'Ο πατέρας παρακολουθεί ειδήσεις και προτιμούν να συζητούν μαζί του πολιτικά θέματα, ενώ η μητέρα διαβάζει βιβλία.'
            )}
            {Chart(
              chart5,
              'Το 62,8% των μαθητών δηλώνει ότι συχνά «ο πατέρας παρακολουθεί ειδήσεις» και το 62,4% ότι συχνά «η μητέρα διαβάζει βιβλία»'
            )}
            <h2 className="students-page-subtitle">ΠΟΛΙΤΙΚΗ</h2>
            {HighlightsSubTitle(
              'Η κυρίαρχη γνώμη των μαθητών για την ψήφο στα 17 εμφανίζεται αμφίθυμη, καθώς μοιράζεται μεταξύ αποδοχής και αδιαφορίας. Το ενδιαφέρον τους' +
                ' για την πολιτική είναι περιορισμένο. Για πολιτικά θέματα προτιμούν να συμβουλεύονται τον πατέρα τους. Οι περισσότεροι ' +
                'υποστηρίζουν την αλλαγή της ελληνικής κοινωνίας σταδιακά με μεταρρυθμίσεις.'
            )}
            {Chart(
              chart3,
              'Το 30,7% των μαθητών χαρακτηρίζει τη δυνατότητα να ψηφίζουν οι νέοι στα 17 ως «αδιάφορη» και το 30,6% ως «μάλλον θετική».'
            )}
            {Chart(chart6, 'Το 43,4% των μαθητών ενδιαφέρεται «λίγο» για την πολιτική και το 6,3% ενδιαφέρεται «πολύ».')}
            {Chart(chart7, 'Το 66% των μαθητών θα προτιμούσε να «ρωτήσει τον πατέρα του/της για πολιτικά θέματα»')}
            {Chart(
              chart8,
              'Το 64,6% των μαθητών υποστηρίζει την αλλαγή της ελληνικής κοινωνίας «σιγά σιγά με μεταρρυθμίσεις» και το 16,7% «ριζικά με επαναστατικά μέτρα»'
            )}
            <h2 className="students-page-subtitle">ΕΘΝΟΣ</h2>
            {HighlightsSubTitle(
              'Η πλειοψηφία των μαθητών αναγνωρίζει την  επιθυμία του αυτοπροσδιορισμού ως το πιο σημαντικό χαρακτηριστικού του/της' +
                ' «πραγματικού/ής Έλληνα/ίδα». Η εθνική υπερηφάνεια συγκροτείται γύρω από την «ιστορία του τόπου», την «τέχνη και τη λογοτεχνία».'
            )}
            {Chart(
              chart9,
              'Το 61% των μαθητών υποστηρίζει ότι «πραγματικός Έλληνας/ίδα» είναι εκείνος/η που «επιθυμεί να είναι Έλληνας/ίδα» και ' +
                '«σέβεται τους θεσμούς της χώρας» (54,5%)'
            )}
            {Chart(
              chart10,
              'Το 81,7% των μαθητών δηλώνουν υπερήφανοι «για την ιστορία του τόπου» και το 56,3% «για τις επιτυχίες στην τέχνη και τη λογοτεχνία»  '
            )}
            <h2 className="students-page-subtitle">ΠΡΟΣΩΠΙΚΟΤΗΤΑ</h2>
            {HighlightsSubTitle(
              'Οι περισσότεροι μαθητές δηλώνουν ότι είναι ικανοποιημένοι από διάφορες παραμέτρους στη ζωή τους, όμως η υψηλότερη ικανοποίηση αντλείται ' +
                'από την οικογένεια. Ως σημαντικότερες αξίες για τη ζωή τους αναγνωρίζουν τη φιλία και ένα επάγγελμα που τους ικανοποιεί, ' +
                'ενώ τα υλικά αγαθά ιεραρχούνται στην τελευταία θέση των αξιών.'
            )}
            {Chart(
              chart11,
              'Το 79,9% των μαθητών δηλώνει ικανοποιημένο «από το σπίτι» του και το 76% από «τις σχέσεις με τους άλλους ανθρώπους»'
            )}
            {Chart(
              chart12,
              'Το 95,7% των μαθητών αξιολογούν τη «φιλία» ως τη σημαντικότερη αξία στη ζωή τους, το 89,8% το «επάγγελμα που ικανοποιεί τα ' +
                'ενδιαφέροντά» τους και το 88,8% τις «αρμονικές οικογενειακές σχέσεις»'
            )}
          </Grid>
          <p className="students-page-text">
            Τμήμα των δεδομένων έχει ήδη αναρτηθεί στην πλατφόρμα socioscope.gr, στην σχετική θεματική:{' '}
            <a target="_blank" href="http://www.socioscope.gr/dataset/adolescents">
              http://www.socioscope.gr/dataset/adolescents
            </a>
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
