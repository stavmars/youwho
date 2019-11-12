import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';

const adminMenuItems = (
  <>
    <Dropdown.Item as={Link} to="/admin/user-management">
      <Icon name="user" />
      Διαχείριση χρηστών
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/admin/metrics">
      <Icon name="tachometer alternate" />
      Μετρήσεις
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/admin/health">
      <Icon name="heart" />
      Υγεία
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/admin/configuration">
      <Icon name="list" />
      Διαμόρφωση
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/admin/audits">
      <Icon name="bell" />
      Ελεγχοι
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/admin/logs">
      <Icon name="tasks" />
      Καταγραφές
    </Dropdown.Item>
  </>
);

const swaggerItem = (
  <Dropdown.Item as={Link} to="/admin/docs">
    <Icon name="book" />
    API
  </Dropdown.Item>
);

export const AdminMenu = ({ showSwagger }) => (
  <Dropdown item simple icon="user-plus" text={'Διαχείριση'} id="admin-menu">
    <Dropdown.Menu>
      {adminMenuItems}
      {showSwagger && swaggerItem}
    </Dropdown.Menu>
  </Dropdown>
);

export default AdminMenu;
