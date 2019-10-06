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
      <Menu>
        <Menu.Item style={{ float: 'left', margin: '20px 0 0 25px' }}>
          <Responsive {...Responsive.onlyMobile}>
            <Image src="/content/images/MobileLogo.svg" />
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Image src="/content/images/HeaderLogo.svg" />
          </Responsive>
        </Menu.Item>
        <Menu.Item style={{ float: 'right', margin: '25px 25px 0 0' }}>
          <Responsive {...Responsive.onlyMobile}>
            <Image src="/content/images/dots.png" />
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <span
              style={{
                marginRight: '100px',
                fontFamily: 'TTNormsProBoldItalic',
                fontSize: '16px'
              }}
            >
              Αποτελέσματα
            </span>
            <Image src="/content/images/instagram.svg" />
            <Image src="/content/images/twitter.svg" />
            <Image src="/content/images/facebook.svg" style={{ marginRight: '55px' }} />
            <Image src="/content/images/HamburgerMenu.svg" style={{ width: '30px', height: '30px' }} />
          </Responsive>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
