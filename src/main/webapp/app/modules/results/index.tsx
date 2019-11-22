import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { Results } from 'app/modules/results/results';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}`} component={Results} />
  </>
);

export default Routes;
