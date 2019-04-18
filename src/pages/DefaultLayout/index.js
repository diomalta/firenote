import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Container, Content } from "../../styles/components";
import AsyncComponent from "../../components/AsyncComponent";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Categories = AsyncComponent(() => import("../Categories"));
const Anotation = AsyncComponent(() => import("../Anotation"));
const Posts = AsyncComponent(() => import("../Posts"));

class DefaultLayout extends Component {
  render() {
    return (
      <Container>
        <ToastContainer />
        <Sidebar />

        <Content>
          <Header />
          <Switch>
            <Route exact path="/categories" component={Categories} />
            <Route
              exact
              path="/subcategories/:id/anotation/:id"
              component={Anotation}
            />
            <Route exact path="/anotations/:id" component={Posts} />
          </Switch>
        </Content>
      </Container>
    );
  }
}

export default DefaultLayout;
