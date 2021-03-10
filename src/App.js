import "./App.css";
import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/auth/auth";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/my-orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
        </Layout>
      </div>
    );
  }
}

export default App;
