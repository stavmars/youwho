/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';
import ResultsAverage from 'app/modules/results/results-average';
import ResultsPersonal from 'app/modules/results/results-personal';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

export class Results extends React.Component<RouteComponentProps> {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <ErrorBoundaryRoute exact path={`${match.url}/average`} component={ResultsAverage} />
        <ErrorBoundaryRoute exact path={`${match.url}/:resultsId`} component={ResultsPersonal} />
      </Switch>
    );
  }
}

export default Results;
