import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container, Content } from '../../styles/components';

// routes config
import routes from '../../routes';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <Container>
        <Sidebar />

        <Content>
          <Header />
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
        </Content>
      </Container>
    );
  }
}

export default DefaultLayout;