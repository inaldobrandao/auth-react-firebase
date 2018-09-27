import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard/Dashboard';
import Auth from './containers/auth/Auth';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Dashboard}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/auth" component={Auth}/>
        </Switch>
      </div>
    );
  }
}

export default App;
