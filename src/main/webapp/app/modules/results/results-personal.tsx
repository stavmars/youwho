import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Container, Grid, Image } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';
import { RouteComponentProps } from 'react-router-dom';
import { getPersonalResults } from 'app/modules/results/results.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
import { ProfilingPill } from 'app/modules/results/profiling-pill';
import _ from 'lodash';

export interface IResultsPersonalProps extends StateProps, DispatchProps, RouteComponentProps<{ resultsId: string }> {}

export class ResultsPersonal extends React.Component<IResultsPersonalProps> {
  componentDidMount() {
    this.props.getPersonalResults(this.props.match.params.resultsId);
  }

  render() {
    const { survey, personalResults } = this.props;
    return (
      <div>
        {personalResults && survey && (
          <Grid className="results" stackable>
            <Grid.Row>
              <Image src="content/images/granny.jpg" circular size="tiny" inline />
              <span className="results-granny-bubble">Ποιος είσαι τελικά;</span>
            </Grid.Row>
            {personalResults && survey && (
              <Grid.Row columns={3}>
                <Grid.Column computer={10} mobile={14}>
                  {survey.profilingVariables.map(profilingVariable => (
                    <ProfilingPill
                      key={profilingVariable.id}
                      profilingVariable={profilingVariable}
                      value={personalResults[profilingVariable.id]}
                    />
                  ))}
                </Grid.Column>
                <ResultsButtonColumn personal />
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
  survey: survey.entitiesByName['youWho'] as ISurvey
});

const mapDispatchToProps = {
  getPersonalResults
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPersonal);
