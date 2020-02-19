import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import DbTool from 'app/modules/db-tool/db-tool';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}`} component={DbTool} />
  </>
);

export default Routes;
