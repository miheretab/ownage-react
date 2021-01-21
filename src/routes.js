import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrankList from "./PrankList";


class Routes extends React.Component {

  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/:slug?" component={PrankList} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
