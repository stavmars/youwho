/* tslint:disable:jsx-no-lambda */
import './db-tool.scss';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import {
  countNonEmptyEntities,
  countCompletedEntities,
  getAverageSurveyResponseTime,
  getAllNonEmptyEntities,
  findAndCleanAllCompletedWithDuplicateAnswers,
  computeResultsOfDuplicateAnswers
} from 'app/modules/db-tool/db-tool.reducer';
import { getEntity as getSurvey } from 'app/entities/survey/survey.reducer';
import moment, { Moment } from 'moment';
import _ from 'lodash';
import CsvDownloader from 'react-csv-downloader';
import { downloadCSV, pivotArray, toCsv } from 'app/shared/util/entity-utils';

export interface IDbToolProps extends StateProps, DispatchProps {}

export interface IDbToolState {
  dataToExport: any[];
}

export class DbTool extends React.Component<IDbToolProps, IDbToolState> {
  constructor(props) {
    super(props);
    this.state = {
      dataToExport: []
    };
  }

  componentDidMount(): void {
    this.props.getSurvey('youWho');
    this.props.countNonEmptyEntities();
    this.props.countCompletedEntities();
    this.props.findAndCleanAllCompletedWithDuplicateAnswers();
    this.props.getAverageSurveyResponseTime('youWho');
  }

  calculateTimElapsed = (start: Moment, end: Moment) => {
    const ms = moment(end).diff(start);
    const d = moment.duration(ms);
    return `${d.hours() ? d.hours() + 'h' : ''}${d.minutes()}m${d.seconds()}s`;
  };

  exportNonEmptyResponsesToCSV = () => {
    const { allNonEmptyEntities, survey } = this.props;
    const questions = _.keyBy(survey.questions, 'id');
    const dataToExport = [];

    allNonEmptyEntities.forEach(response => {
      const questionResponses = response.questionResponses;
      const questionResponsesToExport = [];
      questionResponses.forEach(questionResponse => {
        const responseChoices = _.keyBy(questions[questionResponse.questionId].responseChoices, 'id');
        questionResponsesToExport.push({
          question: questions[questionResponse.questionId].text,
          answerTime: questionResponse.endTime
            ? moment
                .duration(moment(questionResponse.endTime).diff(moment(questionResponse.startTime)))
                .asMinutes()
                .toString()
            : '',
          answer: questionResponse.choiceIds.map(choiceId =>
            parseInt(responseChoices[choiceId].text, 10) !== 0 && parseInt(responseChoices[choiceId].text, 10) < 100
              ? responseChoices[choiceId].description
              : responseChoices[choiceId].text
          )
        });
      });
      dataToExport.push({
        id: response.id,
        status: response.status,
        date: moment(response.startTime).format('DD MM YYYY'),
        totalTime:
          response.status === 'completed'
            ? moment
                .duration(moment(response.endTime).diff(moment(response.startTime)))
                .asMinutes()
                .toString()
            : '',
        questionResponses: questionResponsesToExport.map(item => ({
          question: item.question,
          answerTime: item.answerTime,
          answer: item.answer
        }))
      });
    });
    this.setState({
      dataToExport
    });
  };

  render() {
    const {
      loading,
      nonEmptyEntitiesCount,
      completedEntitiesCount,
      averageCompletionTime,
      allNonEmptyEntities,
      completedWithDuplicateAnswers
    } = this.props;

    const seconds = averageCompletionTime / 1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return (
      <div className="db-tool">
        <h1 className="db-tool-header">Στατιστικά Έρευνας</h1>
        <Grid className="db-tool-grid" centered stackable>
          <Grid.Row columns={4} style={{ marginTop: '5vh' }}>
            <Grid.Column className="db-tool-grid-header">Συνολικός αριθμός απαντήσεων</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Ολοκληρωμένες απαντήσεις</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Ελλιπείς απαντήσεις</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Μέσος χρόνος συμπλήρωσης</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column className="db-tool-grid-content">{nonEmptyEntitiesCount}</Grid.Column>
            <Grid.Column className="db-tool-grid-content">{completedEntitiesCount}</Grid.Column>
            <Grid.Column className="db-tool-grid-content">{nonEmptyEntitiesCount - completedEntitiesCount}</Grid.Column>
            <Grid.Column className="db-tool-grid-content">{`${minutes}min${remainingSeconds}sec`}</Grid.Column>
          </Grid.Row>
          {/*<Grid.Row columns={3} style={{ marginTop: '5vh' }}>*/}
          {/*  <Grid.Column className="db-tool-grid-header">ID</Grid.Column>*/}
          {/*  <Grid.Column className="db-tool-grid-header">Κατάσταση</Grid.Column>*/}
          {/*  <Grid.Column className="db-tool-grid-header">Χρόνος συμπλήρωσης</Grid.Column>*/}
          {/*</Grid.Row>*/}
          {/*{loading*/}
          {/*  ? null*/}
          {/*  : nonEmptyEntities.map(entity => (*/}
          {/*      <Grid.Row columns={3} key={entity.id}>*/}
          {/*        <Grid.Column className="db-tool-grid-content">*/}
          {/*          {entity.status === 'completed' ? <NavLink to={`/results/${entity.id}`}>{entity.id}</NavLink> : entity.id}*/}
          {/*        </Grid.Column>*/}
          {/*        <Grid.Column className="db-tool-grid-content">{entity.status === 'completed' ? 'Ολοκληρωμένη' : 'Ελλιπής'}</Grid.Column>*/}
          {/*        <Grid.Column className="db-tool-grid-content">*/}
          {/*          {entity.status === 'completed' ? this.calculateTimElapsed(entity.startTime, entity.endTime) : null}*/}
          {/*        </Grid.Column>*/}
          {/*      </Grid.Row>*/}
          {/*    ))}*/}
          <Grid.Row>
            {allNonEmptyEntities.length === 0 ? (
              <Button onClick={this.props.getAllNonEmptyEntities} content="Fetch data" loading={loading} />
            ) : this.state.dataToExport.length === 0 ? (
              <Button onClick={this.exportNonEmptyResponsesToCSV} content="Prepare CSV" />
            ) : (
              <Button content="Download CSV" onClick={() => downloadCSV(toCsv(pivotArray(this.state.dataToExport)))} />
            )}
          </Grid.Row>
          {completedWithDuplicateAnswers.length > 0 && (
            <Grid.Row>
              <Button
                content="Re-calculate results"
                color="red"
                onClick={() => this.props.computeResultsOfDuplicateAnswers(this.props.survey)}
              />
            </Grid.Row>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ dbTool, survey }: IRootState) => ({
  survey: survey.entity,
  nonEmptyEntitiesCount: dbTool.nonEmptyEntitiesCount,
  completedEntitiesCount: dbTool.completedEntitiesCount,
  allNonEmptyEntities: dbTool.allNonEmptyEntities,
  completedWithDuplicateAnswers: dbTool.corruptedEntities,
  averageCompletionTime: dbTool.averageCompletionTime,
  loading: dbTool.loading
});

const mapDispatchToProps = {
  getSurvey,
  countNonEmptyEntities,
  countCompletedEntities,
  getAllNonEmptyEntities,
  findAndCleanAllCompletedWithDuplicateAnswers,
  getAverageSurveyResponseTime,
  computeResultsOfDuplicateAnswers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbTool);
