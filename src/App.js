import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/auth/Auth';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import './App.css';
import Home from './containers/home/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import FirebaseAuthService from './services/FirebaseAuthService';
import { signIn } from './actions';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

firebase.initializeApp(config);

class App extends Component {

  componentDidMount(){
    FirebaseAuthService.verifyLogged(this.successLoggedUser);
  }

  successLoggedUser = (user) => {
    this.setState({userLoaded : true });
    if(user != null){
      this.props.signIn(user)
    }else{
      this.props.signIn({})
    }
  }

  render() {
    
    return (
      <div className="App">
        {this.props.user != null && <Switch>
          <Route path="/auth" component={Auth}/>
          <PrivateRoute path="/" exact={true} component={Home} />
          <PrivateRoute path="/dashboard" exact={true} component={Home}/>
        </Switch>        
        }
        {this.props.user === null && <CircularProgress />}
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (data) => dispatch(signIn(data))
  }
}

App = connect(
  mapStateToProps, mapDispatchToProps
)(App);

export default App;
