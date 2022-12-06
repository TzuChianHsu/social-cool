import React, { useContext } from 'react';
import {
  Link,
} from 'react-router-dom'
import LevelTwo from './LevelTwo'
import { UserContext} from '../context';

const SideBar =()=> {
  const { user } = useContext<any>(UserContext)
  return (
      <div>
          <Link to='/'> Sign In Page</Link> |
          <Link to='/home'> Home Page</Link> |
          <Link to='/account'> Account Page</Link> |
          <div>
              {user.level === 2 ? (
                  <>
                      <LevelTwo />
                  </>
              ) : null}
          </div>
      </div>
  )
}

export default SideBar