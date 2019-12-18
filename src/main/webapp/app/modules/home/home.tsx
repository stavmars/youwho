import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Responsive, Image, Modal } from 'semantic-ui-react';
import { Player, BigPlayButton } from 'video-react';

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
              <Grid.Column width={9}>
                <Image src="content/images/giagia.png" className="granny" />
                <Image src="content/images/YellowStripesBg.svg" className="stripes" />
              </Grid.Column>
              <Grid.Column width={6}>
                <Image src="content/images/big-bubble.svg" style={{ left: '-15vw', height: '40vh', zIndex: '1' }} />
                <Image
                  src="content/images/small-bubble.svg"
                  as={Link}
                  to="survey-chat/youWho"
                  style={{ width: '20vw', height: '10vh', top: '2vh' }}
                />
                {subtext()}
                <Modal
                  trigger={
                    <Button style={{ background: 'transparent', borderStyle: 'none', marginTop: '-20px' }}>
                      <Image src="content/images/play-video.svg" inline style={{ width: '7vw', height: '7vh', marginRight: '2vw' }} />
                      <span className="home-subtext">Δές το Βίντεο</span>
                    </Button>
                  }
                  size="large"
                >
                  <Modal.Header>YouWho Promo Video</Modal.Header>
                  <Modal.Content>
                    <Player src="content/images/YouWho Promo-1.mp4">
                      <BigPlayButton position="center" />
                    </Player>
                  </Modal.Content>
                </Modal>
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

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
