import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

export const EntitiesMenu = props => (
  <Dropdown item simple text={'Οντότητες'} id="entity-menu">
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/entity/survey">
        Έρευνα
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/entity/survey-response">
        Απαντήσεις Έρευνας
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
