// tslint:disable:no-submodule-imports
import 'semantic-ui-css/semantic.min.css';
import 'video-react/dist/video-react.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { getEntities } from 'app/entities/survey/survey.reducer';
import Header from 'app/shared/layout/header/header';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Menu, Sidebar } from 'semantic-ui-react';
import SideBar from 'app/shared/layout/header/side-bar';
import { hideSidebar, toggleSidebar } from 'app/shared/reducers/header';
import Footer from 'app/shared/layout/footer/footer';

// tslint:disable:jsx-no-lambda

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
    props.getEntities();
  }, []);

  const menus = '/menus/';
  const results = '/results/';

  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <Switch>
          <Route
            path="/survey-chat/"
            render={() => (
              <Header
                color="white"
                isAuthenticated={props.isAuthenticated}
                isAdmin={props.isAdmin}
                isSwaggerEnabled={props.isSwaggerEnabled}
                toggleSidebar={props.toggleSidebar}
              />
            )}
          />
          <Route
            exact
            path={`(/|/results/average|/results/personal)`}
            render={() => (
              <Header
                color="transparent"
                isAuthenticated={props.isAuthenticated}
                isAdmin={props.isAdmin}
                isSwaggerEnabled={props.isSwaggerEnabled}
                toggleSidebar={props.toggleSidebar}
              />
            )}
          />
        </Switch>
        <Sidebar
          as={Menu}
          vertical
          onHide={props.hideSidebar}
          visible={props.isSidebarVisible}
          animation="overlay"
          direction="right"
          className="app-sidebar"
        >
          <SideBar toggleSidebar={props.toggleSidebar} />
        </Sidebar>
        <Sidebar.Pushable>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
          <Route path="/menus/" render={() => <Footer />} />
          <Route path="/results/" render={() => <Footer />} />
        </Sidebar.Pushable>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, header }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  isSidebarVisible: header.isSidebarVisible
});

const mapDispatchToProps = { getSession, getProfile, getEntities, hideSidebar, toggleSidebar };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
