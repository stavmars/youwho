import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Survey from './survey';
import SurveyResponse from './survey-response';
import NewsPost from './news-post';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/survey`} component={Survey} />
      <ErrorBoundaryRoute path={`${match.url}/survey-response`} component={SurveyResponse} />
      <ErrorBoundaryRoute path={`${match.url}/news-post`} component={NewsPost} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
