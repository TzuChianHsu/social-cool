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
  useNavigate,
} from 'react-router-dom'
import Signin from './pages/SignIn';
import Header from './Header';
const Account = (props: any) => {
  const { sidebar } = props
  return (
      <div>
          {sidebar}
          <p> (Protected) Account page</p>
      </div>
  )
}
const Home = (props: any) => {
  const { sidebar } = props
  return (
      <div>
          {sidebar}
          <p> (Protected) Home Page</p>
      </div>
  )
}
const SideBar = () => {
  const { user } = useContext<any>(UserContext)
  console.log(user.level)
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
const LevelTwo = () => {
  return (
      <div>
          <p>Level 2 can see this </p>
      </div>
  )
}

const Test = () => {
  return (
      <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
      </ul>
  )
}
const useAuth = () => {
  const { user } = useContext<any>(UserContext)
  return user && user.loggedIn
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
          <Route path='/' element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
              <Route path='/home' element={<Home sidebar={<Test />} />} />
              <Route
                  path='/account'
                  element={<Account sidebar={<Test />} />}
              />
              <Route path='/leveltwo' element={<LevelTwo />} />
              <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
      </Routes>
  )
}

const LogInButtons = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(user.loggedIn)

  return (
      <div>
          <p>{`Logged In: ${user.loggedIn}`}</p>
          {!user.loggedIn ? (
              <>
                  <button
                      onClick={() => {
                          if (user.loggedIn) return
                          setUser({ loggedIn: true, level: 1 })
                          localStorage.setItem('userIsLogin', 'true')
                          if (location.state?.from) {
                              navigate(location.state.from)
                          }
                      }}
                  >
                      Log In
                  </button>

                  <button
                      onClick={() => {
                          if (user.loggedIn) return
                          setUser({ loggedIn: true, level: 2 })

                          if (location.state?.from) {
                              navigate(location.state.from)
                          }
                      }}
                  >
                      Log In As Level 2
                  </button>
              </>
          ) : (
              <button
                  onClick={() => {
                      if (!user.loggedIn) return
                      setUser({ loggedIn: false })
                      localStorage.setItem('userIsLogin', 'false')
                  }}
              >
                  Log Out
              </button>
          )}

          <div style={{ marginBottom: '12px' }}></div>
      </div>
  )
}
export const UserContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState({ loggedIn: false, level: null })

  // useEffect(() => {
  //     let token =
  //         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NTUyNzM0NTMsImV4cCI6MTY4NjgwOTQ1MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVfaWQiOiLnmbvlhaXogIXluLPomZ8iLCJ1X25hbWUiOiLnmbvlhaXogIXlkI3nqLEiLCJvcmdfaWQiOiLmiYDlsazntYTnuZQiLCJvd25lcl9vcmdfaWQiOiLos4fmlpnmiYDlsazntYTnuZQiLCJvcmdfbmFtZSI6IuaJgOWxrOe1hOe5lOWQjeeosSIsIm9yZ190eXBlIjoi57WE57mU6aGe5YilIn0.ds6PYx3gaim6UBVpi2a1J9OWjuiT0zGmmnC1lVguyNY'
  //     let decoded = jwt_decode(token)
  //     console.log(decoded)
  // }, [])

  // console.log(localStorage.getItem('userIsLogin'))
  return (
      <>
          <UserContext.Provider value={{ user, setUser }}>
              <Router>
              <LogInButtons />
                  {user.loggedIn ? (
                      <>
                          <SideBar />
                      </>
                  ) : null}
                  <Views />
              </Router>
          </UserContext.Provider>
      </>
  )
}

export default App;
