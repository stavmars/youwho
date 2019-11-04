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
      <Menu borderless compact style={{ marginLeft: '20px', background: 'transparent', borderStyle: 'none' }}>
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
          <Image src="/content/images/close.svg" inline style={{ marginTop: '3px' }} />
        </Menu.Item>
      </Menu>
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/project">
      Το έργο
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/students">
      Μαθητές
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/college-students">
      Φοιτητές
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/young-adults">
      Νέοι 17-29
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/project-team">
      Ομάδα Έργου
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/news">
      Νέα
    </List.Item>
    <List.Item className="sidebar-item" as={NavLink} to="/contact">
      Επικοινωνία
    </List.Item>
    <List.Item className="sidebar-collaboration">Μια συνεργασία των</List.Item>
    <List.Item>
      <Image src="/content/images/ekke white.png" style={{ marginLeft: '60px' }} />
      <Image src="/content/images/Athena_RC_Vertical.svg" />
    </List.Item>
  </List>
);
