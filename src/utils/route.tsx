import React, {useContext} from 'react';
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
import Signin from '../pages/SignIn';
import NewPost from '../pages/NewPost';
import Account from '../pages/Account';
import Dashboard from '../pages/Dashboard';
import Post from '../pages/Post';

import { UserContext} from '../context';

export const useAuth = () => {
  const { user } = useContext<any>(UserContext)
  return user
}
export const ProtectedRoutes = () => {
  const location = useLocation()
  const isAuth = useAuth()
  return isAuth ? (
      <Outlet />
  ) : (
      <>
          <Navigate to='/' replace state={{ from: location }} />
      </>
  )
}
const Views = () => {
  return (
      <Routes>
         <Route path='/' element={<Dashboard />} />
          <Route path='/signIn' element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
              <Route path='*' element={<Navigate to='/' replace />} />
              <Route path='/newPost' element={<NewPost />} />
              <Route path='/my' element={<Account />} />
              <Route path='/posts/:postId' element={<Post />}/>
          </Route>
      </Routes>
  )
}

export default Views