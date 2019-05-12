import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/auth/Auth';
import firebase from 'firebase/app';
import './App.css';
import Home from './containers/home/Home';
import FirebaseAuthService from './services/FirebaseAuthService';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

firebase.initializeApp(config);

FirebaseAuthService.verifyLogged();

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth}/>
          <PrivateRoute path="/" exact={true} component={Home} />
          <PrivateRoute path="/dashboard" exact={true} component={Home} />
        </Switch>
      </div>
    );
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem("logged") === "true" ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/auth',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default App;
