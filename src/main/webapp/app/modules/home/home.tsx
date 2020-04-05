import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Responsive, Image, Modal } from 'semantic-ui-react';
import ReactPlayer from 'react-player';

// tslint:disable:jsx-no-lambda
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    return (
      <div className="home-container">
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Image src="content/images/giagia.png" className="granny" />
                <Image src="content/images/YellowStripesBg.svg" className="stripes" />
              </Grid.Column>
              <Grid.Column width={7}>
                <Image
                  src={
                    'content/images/Purple-Bubble-YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-' +
                    'Center-For-Social-Research-Erevna-Έρευνα-Νέων-Νεοι-Νέες-στην-Ελλάδα.png'
                  }
                  style={{ left: '-20vw', height: '35vh', zIndex: '1' }}
                />
                <Image
                  src={
                    'content/images/Red-Bubble-YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National' +
                    '-Center-For-Social-Research-Erevna-Έρευνα-Νέων-Νεοι-Νέες-στην-Ελλάδα.png'
                  }
                  as={Link}
                  to="/results/average"
                  style={{ left: '-5vw', width: '60vh' }}
                />
                <div style={{ marginTop: '-45 vh' }}>
                  <Modal
                    trigger={
                      <Button style={{ background: 'transparent', borderStyle: 'none' }}>
                        <Image src="content/images/play-video.svg" inline style={{ width: '7vw', height: '7vh', marginRight: '2vw' }} />
                        <span className="home-subtext">Δες το Βίντεο</span>
                      </Button>
                    }
                    basic
                  >
                    <Modal.Content>
                      <ReactPlayer url="https://www.youtube.com/watch?v=AhveenOl5K8&feature=emb_title" playing />
                    </Modal.Content>
                  </Modal>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Grid centered>
            <Grid.Row style={{ padding: 0 }}>
              <Grid.Column width={14}>
                <Image
                  src={
                    'content/images/Purple-Bubble-YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-' +
                    'Center-For-Social-Research-Erevna-Έρευνα-Νέων-Νεοι-Νέες-στην-Ελλάδα_mobile.png'
                  }
                  style={{ left: '15vw', top: '10vh', zIndex: '1' }}
                />
                <Image
                  src={
                    'content/images/Red-Bubble-YouWho.gr-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-' +
                    'Center-For-Social-Research-Erevna-Έρευνα-Νέων-Νεοι-Νέες-στην-Ελλάδα_mobile.png'
                  }
                  as={Link}
                  to="/results/average"
                  style={{ height: '18vh', left: '20vw', top: '-12vh', float: 'right', zIndex: '1' }}
                />
                <Image src="content/images/giagia.png" className="granny" />
                <Image src="content/images/YellowStripesBg.svg" alt="yellow-stripes" className="stripes" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
