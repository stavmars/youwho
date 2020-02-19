import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Container, Dimmer, Grid, Image, Loader } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';
import { RouteComponentProps } from 'react-router-dom';
import { getPersonalResults, getTotalResults } from 'app/modules/results/results.reducer';
import { defaultValue } from 'app/shared/model/survey.model';
import { getEntity } from 'app/entities/survey/survey.reducer';
import { ProfilingVariableResults } from 'app/modules/results/profiling-variable-results';
import _ from 'lodash';

export interface IResultsPersonalProps extends StateProps, DispatchProps, RouteComponentProps<{ resultsId: string }> {}

export class ResultsPersonal extends React.Component<IResultsPersonalProps> {
  componentDidMount() {
    this.props.getEntity('youWho');
    this.props.getPersonalResults(this.props.match.params.resultsId);
    this.props.getTotalResults({});
  }

  render() {
    const { survey, personalResults, totalResults, filters } = this.props;
    return survey === defaultValue ? (
      <Dimmer active page>
        <Loader />
      </Dimmer>
    ) : (
      <div>
        {personalResults && totalResults && survey && (
          <Grid className="results" stackable>
            <Grid.Row>
              <Image className="results-granny-icon" src="content/images/granny.jpg" circular size="tiny" inline />
              <span className="results-granny-bubble">Ποιος είσαι τελικά;</span>
            </Grid.Row>
            {personalResults && survey && (
              <Grid.Row columns={3}>
                <Grid.Column computer={10} mobile={14}>
                  {survey.profilingVariables.map(profilingVariable => (
                    <ProfilingVariableResults
                      key={profilingVariable.id}
                      profilingVariable={profilingVariable}
                      personalValue={personalResults[profilingVariable.id]}
                      totalValue={totalResults[profilingVariable.id]}
                    />
                  ))}
                </Grid.Column>
                <ResultsButtonColumn personal filters={filters} />
              </Grid.Row>
            )}
            <div className="content-divider results" />
            <Grid.Row>
              <Grid.Column computer={10} mobile={14}>
                <Container>
                  <p className="results-description-content">
                    Εμφανίζεσαι{' '}
                    {survey.profilingVariables.map((profilingVariable, index) => (
                      <span>
                        {_.round(personalResults[profilingVariable.id] * 100, 1)}%{' '}
                        <span style={{ textTransform: 'lowercase' }}>{profilingVariable.lowerEnd.name}</span> &{' '}
                        {_.round((1 - personalResults[profilingVariable.id]) * 100, 1)}%{' '}
                        <span style={{ textTransform: 'lowercase' }}>{profilingVariable.upperEnd.name}</span>{' '}
                        {profilingVariable.lowerEnd.description}
                        {index === survey.profilingVariables.length - 1
                          ? '.'
                          : index === survey.profilingVariables.length - 2
                          ? ' και '
                          : ', '}
                      </span>
                    ))}
                  </p>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ results, survey }: IRootState) => ({
  personalResults: results.personalResults,
  totalResults: results.totalResults,
  filters: results.filters,
  survey: survey.entity
});

const mapDispatchToProps = {
  getPersonalResults,
  getTotalResults,
  getEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPersonal);
