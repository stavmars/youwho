import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SurveyChat from './survey-chat';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}`} component={SurveyChat} />
  </>
);

export default Routes;
