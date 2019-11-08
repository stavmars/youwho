import './footer.scss';

import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = props => (
  <div className="footer">
    <Menu text compact stackable style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>
      <Menu.Item as={Link} to="/">
        © 2019 YouWho?
      </Menu.Item>
      <Menu.Item>ΟΡΟΙ ΧΡΗΣΗΣ</Menu.Item>
      <Menu.Item>ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ</Menu.Item>
      <Menu.Item as={Link} to="/menus/contact">
        ΕΠΙΚΟΙΝΩΝΙΑ
      </Menu.Item>
      <Menu.Item as="a" href="https://www.roleplay.gr/" target="_blank">
        ΣΧΕΔΙΑΣΜΟΣ: ROLEPLAY
      </Menu.Item>
    </Menu>
  </div>
);

export default Footer;
