import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Image, Modal, Responsive } from 'semantic-ui-react';
import ReactPlayer from 'react-player';

// tslint:disable:max-line-length
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
                <div
                  style={{
                    position: 'relative',
                    backgroundImage: 'url("content/images/Purple-bubble.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '60vh',
                    marginLeft: '-20vw',
                    height: '40vh',
                    zIndex: 1
                  }}
                >
                  <a href="/survey-chat/students" className="bubble-text">
                    Είσαι φοιτητής/τρια; Πάρε μέρος στην νέα έρευνα YouWho? Students
                  </a>
                </div>
                <div
                  style={{
                    position: 'relative',
                    backgroundImage: 'url("content/images/Red-bubble.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '50vh',
                    height: '30vh',
                    marginLeft: '-5vw',
                    zIndex: 1
                  }}
                >
                  <a href="/menus/results" className="bubble-text">
                    ... εξερευνήστε εδώ τα πιο πρόσφατα αποτελέσματα
                  </a>
                </div>
                {/*<Image
                  src={
                    'content/images/Red-YouWho-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-Center-For-Social-Research-Erevna-Έρευνα-Νέων-Αποτελέσματα.png'
                  }
                  as={Link}
                  to="/menus/results"
                  style={{left: '-5vw', width: '50vh'}}
                />*/}
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
                <div
                  style={{
                    position: 'relative',
                    backgroundImage: 'url("content/images/Purple-bubble.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '40vh',
                    height: '30vh',
                    marginLeft: '25vw',
                    marginTop: '25vh',
                    zIndex: 1
                  }}
                >
                  <a href="/survey-chat/students" className="bubble-text">
                    Είσαι φοιτητής/τρια; Πάρε μέρος στην νέα έρευνα YouWho? Students
                  </a>
                </div>
                {/*                <Image
                  src={
                    'content/images/Purple-YouWho-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-Center-For-Social-Research-Erevna-Έρευνα-Νέων-Αποτελέσματα-1.png'
                  }
                  style={{left: '15vw', top: '10vh', zIndex: '1'}}
                />*/}
                <div
                  style={{
                    position: 'relative',
                    backgroundImage: 'url("content/images/Red-bubble.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '35vh',
                    height: '25vh',
                    marginLeft: '35vw',
                    zIndex: 1
                  }}
                >
                  <a href="/menus/results" className="bubble-text">
                    ... εξερευνήστε εδώ τα πιο πρόσφατα αποτελέσματα
                  </a>
                </div>
                {/*<Image
                  src={
                    'content/images/Red-YouWho-Εθνικό-Κέντρο-Κοινωνικών-Ερευνών-Γιουχου-National-Center-For-Social-Research-Erevna-Έρευνα-Νέων-Αποτελέσματα-1.png'
                  }
                  as={Link}
                  to="/menus/results"
                  style={{height: '15vh', left: '20vw', top: '-12vh', float: 'right', zIndex: '1'}}
                />*/}
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
