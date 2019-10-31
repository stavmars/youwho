import './header.scss';

import React, { useState } from 'react';
import { Image, Menu, Responsive } from 'semantic-ui-react';

import LoadingBar from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  color: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
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
        <Menu borderless style={{ height: '80px', margin: '0', backgroundColor: props.color, borderStyle: 'none' }}>
          <Menu.Item position="left" fitted style={{ marginLeft: '56px' }} as={Link} to="/">
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
            <Image src="content/images/instagram-black.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/twitter-black.svg" />
          </Menu.Item>
          <Menu.Item>
            <Image src="content/images/facebook-black.svg" />
          </Menu.Item>
          <Menu.Item onClick={props.toggleSidebar}>
            <Image src="content/images/HamburgerMenu.svg" style={{ width: '30px', height: '30px' }} />
          </Menu.Item>
        </Menu>
      </Responsive>
      <Responsive {...Responsive.onlyMobile}>
        <Menu borderless style={{ height: '80px', margin: '0', backgroundColor: props.color, borderStyle: 'none' }}>
          <Menu.Item position="left" fitted style={{ marginLeft: '22px' }} as={Link} to="/">
            <Image src="content/images/MobileLogo.svg" />
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
