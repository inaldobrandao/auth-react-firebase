import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard/Dashboard';
import Auth from './containers/auth/Auth';
import firebase from 'firebase/app';
import './App.css';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>          
          <Route path="/auth" component={Auth}/>
          <Route path="/dashboard" component={Dashboard}/>          
          <Route path="/" exact={true} component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

export default App;
