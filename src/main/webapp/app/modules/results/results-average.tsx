import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Grid, Image } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';

export interface IResultsAverageProps extends StateProps, DispatchProps {}

export class ResultsAverage extends React.Component<IResultsAverageProps> {
  render() {
    return (
      <Grid className="results" stackable>
        <Grid.Row>
          <Grid.Column computer={14}>
            <Image src="content/images/granny.jpg" circular size="tiny" inline />
            <span className="results-granny-bubble">Συνολικά αποτελέσματα</span>
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
          <ResultsButtonColumn personal={false} />
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
