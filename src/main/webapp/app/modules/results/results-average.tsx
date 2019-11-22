import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Button, Grid, Image } from 'semantic-ui-react';

export interface IResultsAverageProps extends StateProps, DispatchProps {}

export class ResultsAverage extends React.Component<IResultsAverageProps> {
  render() {
    return (
      <Grid className="results-average" stackable>
        <Grid.Row>
          <Grid.Column computer={14}>
            <Image src="content/images/granny.jpg" circular size="tiny" inline />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={10} mobile={14}>
            <div style={{ display: 'inline-block', padding: '5vh 0 5vh 6vw' }}>
              <div className="results-labels">προοδευτικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">συντηρητικός</div>
            </div>
            <div style={{ display: 'inline-block', padding: '5vh 3vw' }}>
              <div className="results-labels">εθνοκεντρικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">κοσμοπολίτης</div>
            </div>
            <div style={{ display: 'inline-block', padding: '5vh 4vw 5vh 0' }}>
              <div className="results-labels">παθητικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">συμμετοχικός</div>
            </div>
          </Grid.Column>
          <Grid.Column computer={4} mobile={14} verticalAlign="middle">
            <Button.Group style={{ display: 'block' }}>
              <h3 className="filter-type">φύλο</h3>
              <Button className="filter-buttons" style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}>
                <Image src="content/images/male.svg" />
              </Button>
              <Button className="filter-buttons" style={{ height: '48px' }}>
                <Image src="content/images/female.svg" />
              </Button>
              <Button
                className="filter-buttons"
                content="όλοι"
                style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px' }}
              />
            </Button.Group>
            <Button.Group style={{ display: 'block' }}>
              <h3 className="filter-type">ηλικία</h3>
              <Button
                className="filter-buttons"
                content="17-20"
                style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}
              />
              <Button className="filter-buttons" content="21-24" style={{ height: '48px' }} />
              <Button
                className="filter-buttons"
                content="25-28"
                style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px' }}
              />
            </Button.Group>
            <Button.Group style={{ display: 'block', marginTop: '10vh' }}>
              <h3 className="filter-type">Κάνε share</h3>
              <Button className="share-buttons" style={{ background: 'transparent', borderStyle: 'none' }}>
                <Image src="content/images/share-facebook.svg" />
              </Button>
              <Button className="share-buttons" style={{ background: 'transparent', borderStyle: 'none' }}>
                <Image src="content/images/share-twitter.svg" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
)(ResultsAverage);
