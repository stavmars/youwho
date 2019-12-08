import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

export const AccountMenu = () => (
  <Dropdown item simple text={'Λογαριασμός'} id="account-menu">
    <Dropdown.Menu>
      {/*<Dropdown.Item as={Link} to="/account/settings" icon="wrench" text={'Ρυθμίσεις'} />*/}
      {/*<Dropdown.Item as={Link} to="/account/password" icon="clock" text={'Κωδικός'} />*/}
      <Dropdown.Item as={Link} to="/logout" icon="sign-out" text={'Αποσύνδεση'} />
    </Dropdown.Menu>
  </Dropdown>
);

export default AccountMenu;
