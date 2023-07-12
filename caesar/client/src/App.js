import React from "react";
import Navbar from "./componets/Navbar";
import "./App.css";
import Home from "./componets/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Food from "./componets/pages/Food";
import Activities from "./componets/pages/Activities";
import Adventure from "./componets/pages/Adventure";
import Signup from "./componets/pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/option1" component={Food} />
          <Route path="/option2" component={Activities} />
          <Route path="/option3" component={Adventure} />
          <Route path="/sign-up" component={Signup} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
