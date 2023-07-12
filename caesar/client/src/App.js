import React from "react";
import Navbar from "./componets/Navbar";
import "./App.css";
import Home from "./componets/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Option1 from "./componets/pages/Food";
import Option2 from "./componets/pages/Option2";
import Signup from "./componets/pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/option1" component={Option1} />
          <Route path="/option2" component={Option2} />
          <Route path="/sign-up" component={Signup} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
