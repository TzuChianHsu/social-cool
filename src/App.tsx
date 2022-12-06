import React, { useContext, createContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
import Signin from './pages/SignIn';
import Header from './Header';
import Post from './pages/Post';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import { UserContext} from './context';

const useAuth = () => {
  const { user } = useContext<any>(UserContext)
  return user
}
const ProtectedRoutes = () => {
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
              <Route path='/newPost' element={<Post />} />
              <Route path='/my' element={<Account />} />
              <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
      </Routes>
  )
}

function App() {
  const [user, setUser] = useState({})
  return (
      <>
          <UserContext.Provider value={{ user, setUser }}>
              <Router>
              <Header></Header>
                <Views />
              </Router>
          </UserContext.Provider>
      </>
  )
}

export default App;
