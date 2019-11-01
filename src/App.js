import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Hello from './components/Hello.js'
import Login from './components/Login.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/hello">
          <Hello></Hello>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/">
          <Hello></Hello>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
