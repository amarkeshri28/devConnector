import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' Component={Landing} />
      </Routes>
      <section className="container">
        <Routes>
          <Route exact path='/register' Component={Register} />
          <Route exact path='/login' Component={Login} />
        </Routes>
      </section>
    </Fragment>
  </Router>
)

export default App;
