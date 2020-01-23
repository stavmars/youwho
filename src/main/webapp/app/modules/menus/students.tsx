import './students.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Container } from 'semantic-ui-react';

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
          {/*<h1 className="students-page-title">Highlights</h1>*/}
          {/*<Grid centered>*/}
          {/*  <Grid.Column computer={10} mobile={14}>*/}
          {/*    <Image src="content/images/dummy chart.svg" />*/}
          {/*  </Grid.Column>*/}
          {/*  <Grid.Column computer={4} mobile={14}>*/}
          {/*    <p className="students-page-subtext">*/}
          {/*      Τα υψηλότερα ποσοστά διαφωνίας με τους καθηγητές (54,6%) προέρχονται από μαθητές με γονείς υψηλής κοινωνικής θέσης.*/}
          {/*    </p>*/}
          {/*    <Button className="students-page-more-button">Περισσότερα</Button>*/}
          {/*  </Grid.Column>*/}
          {/*</Grid>*/}
          <h1 className="students-page-title">έρευνες νεανικού πληθυσμού</h1>
          <p className="students-page-subtext">
            Για τις ανάγκες του έργου σχεδιάστηκε και υλοποιήθηκε την άνοιξη του 2018 ποσοτική έρευνα πεδίου με αυτο-συμπληρούμενο
            ερωτηματολόγιο σε επιλεγμένες σχολικές μονάδες της Αττικής, σε 792 μαθητές και μαθήτριες Γυμνασίου. Μέσω της έρευνας δόθηκε η
            δυνατότητα να σκιαγραφηθούν οι πολλαπλές πλευρές της ταυτότητας των εφήβων υπό το πρίσμα του φύλου, της ηλικίας και της
            κοινωνικής σύνθεσης της οικογένειας.
          </p>
          {/*<Grid style={{ margin: '45px 0' }}>*/}
          {/*  <Grid.Column width={1}>*/}
          {/*    <div className="vertical-line" />*/}
          {/*  </Grid.Column>*/}
          {/*  <Grid.Column computer={5} mobile={13}>*/}
          {/*    <p className="students-page-important">*/}
          {/*      Ιδιαίτερα αξιοσημείωτο ενδιαφέρον, όμως, παρουσιάζουν οι απαντήσεις των νέων ως προς τους παράγοντες που επηρέασαν την*/}
          {/*      απόφασή τους να εισαχθούν σε ΑΕΝ.*/}
          {/*    </p>*/}
          {/*  </Grid.Column>*/}
          {/*</Grid>*/}
          <p className="students-page-subtext">
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
