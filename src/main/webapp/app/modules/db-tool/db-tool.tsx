/* tslint:disable:jsx-no-lambda */
import './db-tool.scss';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getNonEmptyEntities, getCompletedEntities } from 'app/modules/db-tool/db-tool.reducer';
import moment, { Moment } from 'moment';
import { NavLink } from 'react-router-dom';

export interface IDbToolProps extends StateProps, DispatchProps {}

export class DbTool extends React.Component<IDbToolProps> {
  componentDidMount(): void {
    this.props.getNonEmptyEntities();
    this.props.getCompletedEntities();
  }

  calculateTimElapsed = (start: Moment, end: Moment) => {
    const ms = moment(end).diff(start);
    const d = moment.duration(ms);
    return `${d.hours() ? d.hours() + 'h' : ''}${d.minutes()}m${d.seconds()}s`;
  };

  render() {
    const { loading, nonEmptyEntities, completedEntities, averageCompletionTime } = this.props;

    return (
      <div className="db-tool">
        <h1 className="db-tool-header">Κατάσταση Βάσης</h1>
        <Grid className="db-tool-grid" centered stackable>
          <Grid.Row columns={3} style={{ marginTop: '5vh' }}>
            <Grid.Column className="db-tool-grid-header">Συνολικώς αριθμός απαντήσεων</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Ολοκληρωμένες απαντήσεις</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Μέσος χρόνος συμπλήρωσης</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column className="db-tool-grid-content">{nonEmptyEntities.length}</Grid.Column>
            <Grid.Column className="db-tool-grid-content">{completedEntities.length}</Grid.Column>
            <Grid.Column className="db-tool-grid-content">{averageCompletionTime}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} style={{ marginTop: '5vh' }}>
            <Grid.Column className="db-tool-grid-header">ID</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Κατάσταση</Grid.Column>
            <Grid.Column className="db-tool-grid-header">Χρόνος συμπλήρωσης</Grid.Column>
          </Grid.Row>
          {loading
            ? null
            : nonEmptyEntities.map(entity => (
                <Grid.Row columns={3} key={entity.id}>
                  <Grid.Column className="db-tool-grid-content">
                    {entity.status === 'completed' ? <NavLink to={`/results/${entity.id}`}>{entity.id}</NavLink> : entity.id}
                  </Grid.Column>
                  <Grid.Column className="db-tool-grid-content">{entity.status === 'completed' ? 'Ολοκληρωμένη' : 'Ελλιπής'}</Grid.Column>
                  <Grid.Column className="db-tool-grid-content">
                    {entity.status === 'completed' ? this.calculateTimElapsed(entity.startTime, entity.endTime) : null}
                  </Grid.Column>
                </Grid.Row>
              ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ dbTool }: IRootState) => ({
  nonEmptyEntities: dbTool.nonEmptyEntities,
  completedEntities: dbTool.completedEntities,
  averageCompletionTime: dbTool.averageCompletionTime,
  loading: dbTool.loading
});

const mapDispatchToProps = {
  getNonEmptyEntities,
  getCompletedEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DbTool);
