import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Responsive } from 'semantic-ui-react';

// tslint:disable:jsx-no-lambda

const subtext = () => (
  <div className="home-subtext">
    <span>Είσαι νέα/ος 17-29 ετών;</span>
    <br />
    <br />
    <span>Θέλεις να μάθεις πόσο χαρακτηριστικό δείγμα της γενιάς σου είσαι;</span>
    <br />
    <br />
    <span>Κάνε chat με τη Γιαγιά και μάθε πόσο γιούχου είσαι!</span>
    <br />
    <br />
  </div>
);

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    return (
      <div className="home-container">
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9} className="images-computer">
                <img src="content/images/giagia.png" alt="granny" className="granny" />
                <img src="content/images/YellowStripesBg.svg" alt="yellow-stripes" className="stripes" />
              </Grid.Column>
              <Grid.Column width={6} className="text-computer">
                <p className="home-title-1">
                  <div className="home-title-2">Εσύ ποιός/ποιά</div>
                  <p className="home-title-3">YouWho</p>
                  <span className="home-title-4">είσαι;</span>
                </p>
                {subtext()}
                <Button className="survey-button" as={Link} to="survey-chat/youWho">
                  Κάνε την έρευνα
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Grid centered style={{ height: '100vh' }}>
            <Grid.Row>
              <Grid.Column width={10} style={{ marginTop: '5%' }}>
                {subtext()}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ marginTop: '-150px' }}>
              <Grid.Column width={14}>
                <p className="home-title-1">
                  <div className="home-title-2">Εσύ ποιός/ποιά</div>
                  <p className="home-title-3">YouWho</p>
                  <span className="home-title-4">είσαι;</span>
                </p>
                <Button className="survey-button" as={Link} to="survey-chat/youWho">
                  Κάνε την έρευνα
                </Button>
                <img src="content/images/giagia.png" className="granny" />
                {/*<img src="content/images/YellowStripesBg.svg" alt="yellow-stripes" style={{ left: '-100px' }} />*/}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
