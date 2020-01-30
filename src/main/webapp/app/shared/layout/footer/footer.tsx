import './footer.scss';

import React from 'react';
import { Grid, Menu, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = props => (
  <div className="footer">
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
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
    </Responsive>
    <Responsive {...Responsive.onlyMobile}>
      <Grid centered>
        <Grid.Row as={Link} to="/" style={{ padding: 0, color: '#333333' }}>
          © 2019 YouWho?
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column mobile={6} style={{ padding: 0 }}>
            <div style={{ textAlign: 'center' }}>ΟΡΟΙ ΧΡΗΣΗΣ</div>
          </Grid.Column>
          <Grid.Column mobile={7} style={{ padding: 0 }}>
            <div style={{ textAlign: 'center' }}>ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ</div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as="a" href="https://www.roleplay.gr/" target="_blank" style={{ padding: 0, color: '#333333' }}>
          ΣΧΕΔΙΑΣΜΟΣ: ROLEPLAY
        </Grid.Row>
      </Grid>
    </Responsive>
  </div>
);

export default Footer;
