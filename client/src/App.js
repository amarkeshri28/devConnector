import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {


  useEffect(() => {
    store.dispatch(loadUser());

  }, []);


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' Component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' Component={Register} />
              <Route exact path='/login' Component={Login} />
              <PrivateRoute exact path='/dashboard' Component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>

  )
};

export default App;
