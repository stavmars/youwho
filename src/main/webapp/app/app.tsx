// tslint:disable:no-submodule-imports
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Menu, Sidebar } from 'semantic-ui-react';
import SideBar from 'app/shared/layout/header/side-bar';
import { hideSidebar, toggleSidebar } from 'app/shared/reducers/header';
import Footer from 'app/shared/layout/footer/footer';
import CookieConsent from 'react-cookie-consent';
import ScrollToTop from './scroll-to-top';

// tslint:disable:jsx-no-lambda

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

ReactGA.initialize('UA-158070930-1');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const tracker = ({ location }) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
    return null;
  };

  return (
    <Router basename={baseHref}>
      <ScrollToTop>
        <div className="app-container">
          {/*<Route render={tracker} />*/}
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
              path={`(/|/results|/db-tool|/news-editor|/news-display)`}
              render={() => (
                <Header
                  color="gradient"
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
          <Sidebar.Pushable style={{ transform: 'none' }}>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Sidebar.Pushable>
        </div>
        <Route path={`(/|/results|/menus|/db-tool|/news-editor|/news-display)`} render={() => <Footer />} />
        <CookieConsent
          location="bottom"
          buttonText="Εντάξει"
          cookieName="myAwesomeCookieName2"
          style={{ background: '#2B373B' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
        >
          Το YouWho χρησιμοποιεί cookies για να λειτουργεί σωστά. Τα cookies είναι μικρά κομμάτια δεδομένων που αποθηκεύουν οι ιστοσελίδες
          στον περιηγητή σας για να μας επιτρέψουν να σας προσφέρουμε την καλύτερη δυνατή εμπειρία περιήγησης. Χρησιμοποιώντας τo YouWho
          αποδέχεστε τη χρήση των cookies. <a href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm">Δείτε περισσότερα</a>
        </CookieConsent>
      </ScrollToTop>
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

const mapDispatchToProps = { getSession, getProfile, hideSidebar, toggleSidebar };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
