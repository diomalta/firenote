import React, { Component, Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Content } from '../../styles/components';

// routes config
import routes from '../../routes';

const Header = lazy(() => import("../../components/Header"));
const Sidebar = lazy(() => import("../../components/Sidebar"));


class DefaultLayout extends Component {
  render() {
    const loading = <div className="loading">Loading...</div>;

    return (
      <Container>
        <ToastContainer />
        <Suspense fallback={loading}>
          <Sidebar />
        </Suspense>

        <Content>
        <Suspense fallback={loading}>
          <Header />
        </Suspense>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {                
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <route.component {...props} />
                    )} />
                ) : (null);
              })}
              <Redirect from="/" to="/categories" />
            </Switch> 
          </Suspense>
        </Content>
      </Container>
    );
  }
}

export default DefaultLayout;