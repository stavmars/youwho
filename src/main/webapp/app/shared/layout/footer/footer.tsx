import './footer.scss';

import React from 'react';
import { Grid, Image, Menu, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = props => (
  <div className="footer">
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu text compact style={{ backgroundColor: 'transparent', borderStyle: 'none' }}>
        <Menu.Item as={Link} to="/">
          © 2019 YouWho?
        </Menu.Item>
        <Menu.Item as="a" href="content/oroi-xrisis.pdf" target="_blank">
          ΟΡΟΙ ΧΡΗΣΗΣ
        </Menu.Item>
        <Menu.Item as={Link} to="/menus/contact">
          ΕΠΙΚΟΙΝΩΝΙΑ
        </Menu.Item>
        <Menu.Item style={{ padding: 0 }}>
          <Image src="content/images/espa-el.png" />
        </Menu.Item>
        <Menu.Item as="a" href="https://www.ekke.gr/centre/privacy_policy" target="_blank">
          ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ
        </Menu.Item>
        <Menu.Item as="a" href="https://www.roleplay.gr/" target="_blank">
          ΣΧΕΔΙΑΣΜΟΣ: ROLEPLAY
        </Menu.Item>
      </Menu>
    </Responsive>
    <Responsive {...Responsive.onlyMobile}>
      <Grid centered style={{ marginTop: '5px' }}>
        <Grid.Row as={Link} to="/" style={{ padding: 0, color: '#333333' }}>
          © 2019 YouWho?
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column mobile={6} style={{ padding: 0 }}>
            <a href="content/oroi-xrisis.pdf" target="_blank" style={{ textAlign: 'center', color: '#333333' }}>
              ΟΡΟΙ ΧΡΗΣΗΣ
            </a>
          </Grid.Column>
          <Grid.Column mobile={7} style={{ padding: 0 }}>
            <a href="https://www.ekke.gr/centre/privacy_policy" target="_blank" style={{ textAlign: 'center', color: '#333333' }}>
              ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ
            </a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ padding: '14px 0 10px 0' }}>
          <Image size="small" src="content/images/espa-el.png" />
        </Grid.Row>
        <Grid.Row style={{ padding: 0 }}>
          <Grid.Column mobile={4} as={Link} to="/menus/contact" style={{ padding: 0, color: '#333333', textAlign: 'center' }}>
            ΕΠΙΚΟΙΝΩΝΙΑ
          </Grid.Column>
          <Grid.Column
            mobile={7}
            style={{ padding: 0, color: '#333333', textAlign: 'center' }}
            as="a"
            href="https://www.roleplay.gr/"
            target="_blank"
          >
            ΣΧΕΔΙΑΣΜΟΣ: ROLEPLAY
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Responsive>
  </div>
);

export default Footer;
