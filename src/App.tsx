import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Header from './Header';
import { UserContext} from './context';
import Views from './utils/route'

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
