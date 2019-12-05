import './header.scss';

import React, { useState } from 'react';
import { Image, Menu, Responsive } from 'semantic-ui-react';

import LoadingBar from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';
import { AccountMenu, AdminMenu, EntitiesMenu } from '../menus';

export interface IHeaderProps {
  color: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSwaggerEnabled: boolean;
  toggleSidebar?(): void;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div className="app-header">
      <LoadingBar className="loading-bar" />
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu text className={`header ${props.color}`}>
          <Menu.Item position="left" fitted style={{ marginLeft: '56px' }} as={Link} to="/">
            <Image src="content/images/HeaderLogo.svg" />
          </Menu.Item>
          {props.isAuthenticated && <EntitiesMenu />}
          {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
          {props.isAuthenticated && <AccountMenu />}
          <Menu.Item
            position="right"
            style={{
              marginRight: '100px',
              fontFamily: 'TTNormsProBoldItalic',
              color: '#333333',
              fontSize: '16px'
            }}
            as={Link}
            to="/results/average"
          >
            Αποτελέσματα
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/instagram-black.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/twitter-black.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/facebook-black.svg" />
          </Menu.Item>
          <Menu.Item onClick={props.toggleSidebar}>
            <Image src="content/images/HamburgerMenu.svg" style={{ width: '30px', height: '30px', margin: '0 50px' }} />
          </Menu.Item>
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu text className={`header ${props.color}`}>
          <Menu.Item position="left" fitted style={{ marginLeft: '22px' }} as={Link} to="/">
            <Image src="content/images/MobileLogo.svg" />
          </Menu.Item>
          <Menu.Item
            style={{
              font: 'Bold Italic 16px/34px TT Norms Pro',
              letterSpacing: '0',
              opacity: '1',
              color: '#333333'
            }}
            as={Link}
            to="/results/average"
          >
            Αποτελέσματα
          </Menu.Item>
          <Menu.Item position="right" fitted onClick={props.toggleSidebar}>
            <Image src="content/images/dots.svg" style={{ width: '80px', height: '50px' }} />
          </Menu.Item>
        </Menu>
      </Responsive>
    </div>
  );
};

export default Header;
