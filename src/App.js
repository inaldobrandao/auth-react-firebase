import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard/Dashboard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
