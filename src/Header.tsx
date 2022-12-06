import React, { useEffect, useContext} from 'react';
import { Menu, Search } from "semantic-ui-react";
import firebase from './utils/firebase';
import { UserContext} from './context';
import {
  Link,
} from 'react-router-dom'

function Header() {
  const { user, setUser } = useContext(UserContext)
  useEffect(()=> {
    firebase.auth().onAuthStateChanged((currentUser)=> {
       setUser(currentUser)
    })
  }, [ user])

  return (  <Menu>
  <Menu.Item as={Link} to="/">Social Cool</Menu.Item>
  <Menu.Item><Search></Search></Menu.Item>
   <Menu.Menu position="right">
     { !user &&  <Menu.Item as={Link} to="/signIn"> 註冊/登入</Menu.Item>}
     { user && <><Menu.Item as={Link} to="/newPost">發表文章</Menu.Item>
     <Menu.Item as={Link} to="/my">會員</Menu.Item>
     <Menu.Item onClick={()=> {
       firebase.auth().signOut() 
      }}>登出</Menu.Item></>}
   </Menu.Menu>
  </Menu>)

}

export default Header;
