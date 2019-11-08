import './header.scss';
import React from 'react';
import { Image, List, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface ISideBarProps {
  toggleSidebar(): void;
}

export default (props: ISideBarProps) => (
  <List className="sidebar-list">
    <List.Item>
      <Menu text compact style={{ margin: '15px 0 0 30px', background: 'transparent', borderStyle: 'none' }}>
        <Menu.Item>
          <Image src="/content/images/instagram-white.svg" inline />
        </Menu.Item>
        <Menu.Item>
          <Image src="/content/images/facebook-white.svg" inline />
        </Menu.Item>
        <Menu.Item>
          <Image src="/content/images/twitter-white.svg" inline />
        </Menu.Item>
        <Menu.Item onClick={props.toggleSidebar}>
          <Image src="/content/images/close.svg" inline />
        </Menu.Item>
      </Menu>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/project">
      <span>Το έργο</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/students">
      <span>Μαθητές</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/college-students">
      <span>Φοιτητές</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/young-adults">
      <span>Νέοι 17-29</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/project-team">
      <span>Ομάδα Έργου</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/news">
      <span>Νέα</span>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/menus/contact">
      <span>Επικοινωνία</span>
    </List.Item>
    <List.Item className="sidebar-collaboration">Μια συνεργασία των</List.Item>
    <List.Item>
      <Menu text compact style={{ marginLeft: '50px', background: 'transparent', borderStyle: 'none' }}>
        <Menu.Item>
          <Image src="/content/images/ekke white.png" style={{ marginLeft: '25%' }} as="a" href="https://www.ekke.gr" />
        </Menu.Item>
        <Menu.Item>
          <Image src="/content/images/Athena_RC_Vertical.svg" as="a" href="https://www.athena-innovation.gr" />
        </Menu.Item>
      </Menu>
    </List.Item>
  </List>
);
