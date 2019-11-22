/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { toggleSidebar } from 'app/shared/reducers/header';
import Header from 'app/shared/layout/header/header';
import ResultsAverage from 'app/modules/results/results-average';

export interface IResultsProp extends StateProps, DispatchProps, RouteComponentProps {}

export class Results extends React.Component<IResultsProp> {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Route
          path={`${match.url}`}
          render={() => (
            <Header
              color="transparent"
              isAuthenticated={this.props.isAuthenticated}
              isAdmin={this.props.isAdmin}
              isSwaggerEnabled={this.props.isSwaggerEnabled}
              toggleSidebar={this.props.toggleSidebar}
            />
          )}
        />
        <Switch>
          <Route exact path={`${match.url}/average`} render={() => <ResultsAverage />} />
          <Route exact path={`${match.url}/personal`} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = {
  toggleSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
