import './young-adults.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Container } from 'semantic-ui-react';

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
              Η συγκεκριμένη έρευνα απετέλεσε προϊόν ενδελεχούς σχεδιασμού και μελέτης των τάσεων και προτιμήσεων των νέων, καθώς στόχος
              είναι η δημιουργία ενός περιβάλλοντος συμπλήρωσης μιας διαδικτυακής έρευνας το οποίο θα ενσωματώνει στοιχεία που θα την
              καθιστούν οικεία και ελκυστική στην πληθυσμό στόχο. Για το λόγο αυτό σχεδιάστηκε από το μηδέν ένα εργαλείο προσανατολισμένο
              αποκλειστικά στην συγκεκριμένη ηλικιακή ομάδα το οποίο προσφέρει ένα σύνθετο αποτύπωμα επιμέρους προφίλ των νέων.
            </p>
          </Container>
        </div>
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
