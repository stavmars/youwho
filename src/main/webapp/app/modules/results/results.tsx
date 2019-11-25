/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';
import ResultsAverage from 'app/modules/results/results-average';

export class Results extends React.Component<RouteComponentProps> {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/average`} render={() => <ResultsAverage />} />
        <Route exact path={`${match.url}/personal`} />
      </Switch>
    );
  }
}

export default Results;
