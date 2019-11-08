import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Menus from 'app/modules/menus/menus';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute path={`${match.url}`} component={Menus} />
  </>
);

export default Routes;
