import { Switch } from "react-router-dom";
import Route from './Route'
import React from "react";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Header from "../Components/Header";

function RoutesApp() {
  return (
   
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>

        <Route exact path='/dashboard' component={Dashboard} isPrivate/>
      </Switch>

  );
}

export default RoutesApp;
