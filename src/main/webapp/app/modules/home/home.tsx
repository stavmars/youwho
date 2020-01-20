import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Responsive, Image, Modal } from 'semantic-ui-react';

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
    const { isAuthenticated } = this.props;

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
                <Image src="content/images/big-bubble.svg" style={{ left: '-15vw', height: '40vh', zIndex: '1' }} />
                <Image
                  src="content/images/small-bubble.svg"
                  as={Link}
                  to="survey-chat/youWho"
                  style={{ width: '20vw', height: '10vh', top: '2vh' }}
                />
                {subtext()}
                {isAuthenticated && (
                  <Modal
                    trigger={
                      <Button style={{ background: 'transparent', borderStyle: 'none', marginTop: '-20px' }}>
                        <Image src="content/images/play-video.svg" inline style={{ width: '7vw', height: '7vh', marginRight: '2vw' }} />
                        <span className="home-subtext">Δές το Βίντεο</span>
                      </Button>
                    }
                    basic
                  >
                    <Modal.Content>
                      <iframe
                        width="720"
                        height="480"
                        src="https://www.youtube.com/embed/AhveenOl5K8"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Modal.Content>
                  </Modal>
                )}
                <div style={{ marginLeft: '65%', marginTop: '-30px' }}>
                  <span className="home-subtext">Υπό την Αιγίδα</span>
                  <Image src="content/images/CoA_logoHor_el.png" size="tiny" inline style={{ marginLeft: '10px' }} />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Grid centered style={{ height: '100vh' }}>
            <Grid.Row>{subtext()}</Grid.Row>
            <Grid.Row>
              <Grid.Column width={14}>
                <Image
                  src="content/images/big-bubble.svg"
                  style={{ width: '65vw', height: '23vh', left: '24vw', top: '2vh', zIndex: '1' }}
                />
                <Image
                  src="content/images/small-bubble.svg"
                  as={Link}
                  to="survey-chat/youWho"
                  style={{ width: '45vw', height: '13vh', top: '5vh', float: 'right', zIndex: '1' }}
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
