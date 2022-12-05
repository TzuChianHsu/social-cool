import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import  { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Signin from './pages/SignIn'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <Header></Header>
     <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
     </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
