import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Grid, Image } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';
import { ISurvey } from 'app/shared/model/survey.model';
import { getTotalResults } from 'app/modules/results/results.reducer';
import { ProfilingVariableResults } from 'app/modules/results/profiling-variable-results';

export interface IResultsAverageProps extends StateProps, DispatchProps {}

export class ResultsAverage extends React.Component<IResultsAverageProps> {
  componentDidMount() {
    this.props.getTotalResults({});
  }

  render() {
    const { survey, totalResults, filters } = this.props;
    return (
      <div>
        {totalResults && survey && (
          <Grid className="results" stackable>
            <Grid.Row>
              <Image className="results-granny-icon" src="content/images/granny.jpg" circular inline />
              <span className="results-granny-bubble">Συνολικά αποτελέσματα</span>
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
  survey: survey.entitiesByName['youWho'] as ISurvey
});

const mapDispatchToProps = {
  getTotalResults
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsAverage);
