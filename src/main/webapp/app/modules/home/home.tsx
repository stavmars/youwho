import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Responsive, Image, Modal } from 'semantic-ui-react';
import Countdown from 'react-countdown';
import ReactPlayer from 'react-player';

// tslint:disable:jsx-no-lambda

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <span>Η έρευνα έχει ολοκληρωθεί</span>;
  } else {
    // Render a countdown
    return (
      <span>
        Η έρευνα λήγει σε...{' '}
        <span style={{ color: '#ff6666' }}>
          {days}ημ:{hours}ω:{minutes}λ:{seconds}δ
        </span>
      </span>
    );
  }
};

const subtext = () => (
  <div className="home-subtext">
    <span>Είσαι 17-29 ετών;</span>
    <br />
    <br />
    <span>Θέλεις να μάθεις πόσο χαρακτηριστικό δείγμα της γενιάς σου είσαι;</span>
    <br />
    <br />
    <span>Κάνε chat με τη Γιαγιά και μάθε πόσο γιούχου είσαι!</span>
    <br />
    <br />
    <Countdown date={'2020-04-05T23:59:59'} renderer={renderer} />
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
              <Grid.Column width={9}>
                <Image src="content/images/giagia.png" className="granny" />
                <Image src="content/images/YellowStripesBg.svg" className="stripes" />
              </Grid.Column>
              <Grid.Column width={7}>
                <Image src="content/images/bubble-purple-landing.png" style={{ left: '-15vw', zIndex: '1', height: '26.35vh' }} />
                <Image src="content/images/bubble-pink-landing.png" as={Link} to="survey-chat" style={{ top: '2vh', width: '29vw' }} />
                <div style={{ marginTop: '10vh' }}>{subtext()}</div>
                <div style={{ marginTop: '2vh' }}>
                  <Modal
                    trigger={
                      <Button style={{ background: 'transparent', borderStyle: 'none', marginTop: '-20px' }}>
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
                  <div style={{ marginLeft: '60%', marginTop: '-65px' }}>
                    <span className="sponsored-by">Υπό την Αιγίδα</span>
                    <Image src="content/images/CoA_logoHor_el.png" size="small" inline style={{ marginLeft: '10px' }} />
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Grid centered>
            <Grid.Row>{subtext()}</Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
              <Grid.Column width={14}>
                <Image
                  src="content/images/bubble-purple-landing.png"
                  style={{ width: '45vw', height: '18vh', left: '24vw', top: '2vh', zIndex: '1' }}
                />
                <Image
                  src="content/images/bubble-pink-landing.png"
                  as={Link}
                  to="survey-chat"
                  style={{ width: '60vw', height: '18vh', top: '5vh', float: 'right', zIndex: '1' }}
                />
                <Image src="content/images/giagia.png" className="granny" />
                <Image src="content/images/YellowStripesBg.svg" alt="yellow-stripes" className="stripes" />
                <div style={{ marginLeft: '60vw', marginTop: '-50vh', zIndex: 1 }}>
                  <span className="sponsored-by" style={{ position: 'absolute' }}>
                    Υπό την Αιγίδα
                  </span>
                  <Image src="content/images/CoA_logoHor_el.png" size="tiny" inline style={{ marginLeft: '10px', marginTop: '15px' }} />
                </div>
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
