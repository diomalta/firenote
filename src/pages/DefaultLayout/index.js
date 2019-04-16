import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container, Content } from "../../styles/components";

// routes config
// import routes from '../../routes';

const Header = lazy(() => import("../../components/Header"));
const Sidebar = lazy(() => import("../../components/Sidebar"));

const Anotation = React.lazy(() => import("../Anotation"));
const Categories = React.lazy(() => import("../Categories"));
const Posts = React.lazy(() => import("../Posts"));

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
              <Route exact path="/categories" component={Categories} />
              <Route
                exact
                path="/subcategories/:id/anotation/:id"
                component={Anotation}
              />
              <Route exact path="/anotations/:id" component={Posts} />
            </Switch>
          </Suspense>
        </Content>
      </Container>
    );
  }
}

export default DefaultLayout;
