import './young-adults.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar, hideSidebar } from 'app/shared/reducers/header';
import { isBrowser } from 'react-device-detect';
import { Container } from 'semantic-ui-react';

export interface IYoungAdultsProps extends StateProps, DispatchProps {}

export class YoungAdults extends React.Component<IYoungAdultsProps> {
  componentDidMount() {
    if (isBrowser) {
      this.props.showSidebar();
    } else {
      this.props.hideSidebar();
    }
  }

  render() {
    return (
      <div className="young-adults-page">
        <div className="young-adults-page-top">
          <Container>
            <h1 className="young-adults-page-top-title">Νέοι 17-29</h1>
            <p className="young-adults-page-top-subtext">
              Διαδικτυακή ποσοτική έρευνα μέσω της ψηφιακής πλατφόρμας (YouWho?) σε νέους ηλικίας 17-29 ετών. Η έρευνα αυτή στοχεύει στην
              ανίχνευση στάσεων, αντιλήψεων, ταυτοτήτων, συμπεριφορών της νεολαίας. Το πεδίο της έρευνας νέων 17-29 θα ξεκινήσει το
              Σεπτέμβριο του 2019.
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
  showSidebar,
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YoungAdults);
