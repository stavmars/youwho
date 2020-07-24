/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import Header from 'app/shared/layout/header/header';
import { connect } from 'react-redux';
import { toggleSidebar } from 'app/shared/reducers/header';
import CollegeStudents from 'app/modules/menus/college-students';
import Contact from 'app/modules/menus/contact';
import News from 'app/modules/menus/news';
import Project from 'app/modules/menus/project';
import ProjectTeam from 'app/modules/menus/project-team';
import Students from 'app/modules/menus/students';
import YoungAdults from 'app/modules/menus/young-adults';

export interface IMenusProps extends StateProps, DispatchProps, RouteComponentProps {}

export class Menus extends React.Component<IMenusProps> {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Switch>
          <Route
            exact
            path={`(${match.url}/students|${match.url}/college-students|${match.url}/young-adults)`}
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
          <Route
            path={`${match.url}`}
            render={() => (
              <Header
                color="gradient"
                isAuthenticated={this.props.isAuthenticated}
                isAdmin={this.props.isAdmin}
                isSwaggerEnabled={this.props.isSwaggerEnabled}
                toggleSidebar={this.props.toggleSidebar}
              />
            )}
          />
        </Switch>
        <div className="menus-component">
          <Switch>
            <Route exact path={`${match.url}/college-students`} render={() => <CollegeStudents />} />
            <Route exact path={`${match.url}/contact`} render={() => <Contact />} />
            <Route exact path={`${match.url}/news`} render={() => <News isResultsPost={false} />} />
            <Route exact path={`${match.url}/results`} render={() => <News isResultsPost />} />
            <Route exact path={`${match.url}/project`} render={() => <Project />} />
            <Route exact path={`${match.url}/project-team`} render={() => <ProjectTeam />} />
            <Route exact path={`${match.url}/students`} render={() => <Students />} />
            <Route exact path={`${match.url}/young-adults`} render={() => <YoungAdults />} />
          </Switch>
        </div>
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
)(Menus);
