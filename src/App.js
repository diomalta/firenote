import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Provider } from './services/contextApi';

import { GlobalStyle } from './styles/components';

import './styles/dracula.css';
import './styles/core.css';
import "react-mde/lib/styles/css/react-mde-all.css";

const loading = () => <div className="loading">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./pages/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./pages/Register'),
  loading
});

class App extends Component {
  render() {
    const checkAuth = () => {
      if (
        !localStorage.getItem('@email') 
        || !localStorage.getItem('@id')
        || !localStorage.getItem('@token') 
      ) {
        return false;
      }
      return true;
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        checkAuth()
          ? <Component {...props} />
          : <Redirect to='/signin' />
      )} />
    );

    const AuthRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        checkAuth()
          ? <Redirect to='/categories' /> 
          : <Component {...props} />
      )} />
    );

    return (
      <Fragment>
        <Provider>
          <HashRouter>
            <Switch>
              <AuthRoute path="/signin" name="Home" component={Login} />
              <AuthRoute path="/signup" name="Home" component={Register} />
              <PrivateRoute path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </HashRouter>
        </Provider>
        <GlobalStyle />
      </Fragment>
    );
  }
}

export default App;
