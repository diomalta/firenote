import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Loadable from "react-loadable";

import { Provider } from "./services/contextApi";

import { GlobalStyle } from "./styles/components";

import "react-toastify/dist/ReactToastify.css";
import "./styles/dracula.css";
import "./styles/core.css";
import "react-mde/lib/styles/css/react-mde-all.css";

// Containers
import DefaultLayout from "./pages/DefaultLayout";

const loading = () => <div className="loading">Loading...</div>;

// Pages
const Login = Loadable({
  loader: () => import("./pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./pages/Register"),
  loading
});

class App extends Component {
  render() {
    const checkAuth = () => {
      if (
        !localStorage.getItem("@email") ||
        !localStorage.getItem("@token") ||
        !localStorage.getItem("@id")
      ) {
        return false;
      }
      return true;
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          checkAuth() ? <Component {...props} /> : <Redirect to="/signin" />
        }
      />
    );

    return (
      <Fragment>
        <Provider>
          <BrowserRouter>
            <Switch>
              <Route path="/signin" name="Home" component={Login} />
              <Route path="/signup" name="Home" component={Register} />
              <PrivateRoute path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </BrowserRouter>
        </Provider>
        <GlobalStyle />
      </Fragment>
    );
  }
}

export default App;
