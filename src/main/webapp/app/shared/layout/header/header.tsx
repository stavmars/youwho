import './header.scss';

import React from 'react';
import { Image, Menu, Responsive } from 'semantic-ui-react';

import LoadingBar from 'react-redux-loading-bar';
import { Link } from 'react-router-dom';
import { AccountMenu } from '../menus';

export interface IHeaderProps {
  color: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSwaggerEnabled: boolean;
  toggleSidebar?(): void;
}

const Header = (props: IHeaderProps) => (
  <div className="app-header">
    <LoadingBar className="loading-bar" />
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu text fixed={props.color === 'gradient' ? 'top' : null} className={`header ${props.color}`}>
        <Menu.Item position="left" fitted style={{ marginLeft: '56px' }} as={Link} to="/">
          <Image src="content/images/HeaderLogo.png" style={{ width: '10vw' }} />
        </Menu.Item>
        {/*{props.isAuthenticated && <EntitiesMenu />}*/}
        {/*{props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}*/}
        {props.isAuthenticated && <AccountMenu />}
        <Menu.Item position="right" as="a" href="https://www.youtube.com/channel/UCEfMZfe5xokl-CIPGucqBfg" target="_blank">
          <Image src="content/images/youtube-black.png" />
        </Menu.Item>
        <Menu.Item as="a" href="https://www.instagram.com/youwho.gr/" target="_blank">
          <Image src="content/images/instagram-black.svg" />
        </Menu.Item>
        <Menu.Item as="a" href="https://www.facebook.com/YouWho.gr/" target="_blank">
          <Image src="content/images/facebook-black.svg" />
        </Menu.Item>
        <Menu.Item onClick={props.toggleSidebar}>
          <Image src="content/images/HamburgerMenu.svg" style={{ width: '30px', height: '30px', margin: '0 50px' }} />
        </Menu.Item>
      </Menu>
    </Responsive>
    <Responsive {...Responsive.onlyMobile}>
      <Menu text fixed={props.color === 'gradient' ? 'top' : null} className={`header ${props.color}`}>
        <Menu.Item position="left" fitted style={{ marginLeft: '22px' }} as={Link} to="/">
          <Image src="content/images/MobileLogo.png" style={{ width: '15vw' }} />
        </Menu.Item>
        <Menu.Item position="right" onClick={props.toggleSidebar}>
          <Image src="content/images/dots.svg" style={{ width: '80px', height: '50px' }} />
        </Menu.Item>
      </Menu>
    </Responsive>
  </div>
);

export default Header;
