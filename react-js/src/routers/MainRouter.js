import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Plagiarism from "../pages/Plagiarism";

export default function MainRouter(props) {
  return (
    <Router>


      <div>
        {
          props.children
        }

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/plagiarism">
            <Plagiarism />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

/*

 <nav>
            <ul>
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li>
                <Link to="/login" >login</Link>
              </li>
              <li>
                <Link to="/register" >register</Link>
              </li>
              <li>
                <Link to="/plagiarism" >plagiarism</Link>
              </li>

            </ul>
          </nav>


          */
