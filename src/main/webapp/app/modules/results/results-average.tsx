import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Dimmer, Grid, Image, Loader } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';
import { defaultValue } from 'app/shared/model/survey.model';
import { getEntity } from 'app/entities/survey/survey.reducer';
import { getTotalResults } from 'app/modules/results/results.reducer';
import { ProfilingVariableResults } from 'app/modules/results/profiling-variable-results';

export interface IResultsAverageProps extends StateProps, DispatchProps {}

export class ResultsAverage extends React.Component<IResultsAverageProps> {
  componentDidMount() {
    this.props.getTotalResults({});
    this.props.getEntity('youWho');
  }

  render() {
    const { survey, totalResults, filters } = this.props;
    return survey === defaultValue ? (
      <Dimmer active page>
        <Loader />
      </Dimmer>
    ) : (
      <div>
        {totalResults && survey && (
          <Grid className="results" stackable>
            <Grid.Row>
              <Image className="results-granny-icon" src="content/images/granny.jpg" circular inline />
              <span className="results-granny-bubble">Συνολικά αποτελέσματα</span>
            </Grid.Row>
            <Grid.Row centered className="results-disclaimer">
              Τα συνολικά αποτελέσματα είναι προσωρινά και αναδιαμορφώνονται συνεχώς καθώς προστίθενται νέες απαντήσεις.
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column computer={10} mobile={14}>
                {survey.profilingVariables.map(profilingVariable => (
                  <ProfilingVariableResults
                    key={profilingVariable.id}
                    profilingVariable={profilingVariable}
                    totalValue={totalResults[profilingVariable.id]}
                  />
                ))}
              </Grid.Column>
              <ResultsButtonColumn personal={false} filters={filters} />
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ results, survey }: IRootState) => ({
  totalResults: results.totalResults,
  filters: results.filters,
  survey: survey.entity
});

const mapDispatchToProps = {
  getTotalResults,
  getEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsAverage);
