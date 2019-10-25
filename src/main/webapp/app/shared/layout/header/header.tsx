import './header.scss';

import React, { useState } from 'react';
import { Image, Menu, Responsive } from 'semantic-ui-react';

import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div className="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu borderless style={{ height: '80px', margin: '0' }}>
          <Menu.Item position="left" fitted>
            <Image src="content/images/HeaderLogo.svg" />
          </Menu.Item>
          <Menu.Item position="right" fitted>
            <span
              style={{
                marginRight: '100px',
                fontFamily: 'TTNormsProBoldItalic',
                fontSize: '16px'
              }}
            >
              Αποτελέσματα
            </span>
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/instagram.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/twitter.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/facebook.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/HamburgerMenu.svg" style={{ width: '30px', height: '30px' }} />
          </Menu.Item>
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu borderless style={{ height: '80px', margin: '0' }}>
          <Menu.Item position="left" fitted>
            <Image src="content/images/MobileLogo.svg" />
          </Menu.Item>
          <Menu.Item position="right" fitted>
            <Image src="content/images/dots.png" />
          </Menu.Item>
        </Menu>
      </Responsive>
    </div>
  );
};

export default Header;
