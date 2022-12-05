import React from 'react';
import { Menu, Search } from "semantic-ui-react";
import { Link } from 'react-router-dom'
function Header() {
  return (  <Menu>
  <Menu.Item as={Link} to="/">Social Cool</Menu.Item>
  <Menu.Item><Search></Search></Menu.Item>
   <Menu.Menu position="right">
    <Menu.Item as={Link} to="/signIn"> 註冊/登入</Menu.Item>
   </Menu.Menu>
  </Menu>)

}

export default Header;
