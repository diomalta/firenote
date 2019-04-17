import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Container, Content } from "../../styles/components";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import Anotation from "../Anotation";
import Categories from "../Categories";
import Posts from "../Posts";

import Loading from "../../components/Loading";

const loading = () => <Loading />;

class DefaultLayout extends Component {
  render() {
    return (
      <Container>
        <ToastContainer />
        <Sidebar />

        <Content>
          <Header />
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
