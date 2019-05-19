import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

class Home extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.verifyToken();
    }

    verifyToken(uriRedirect = undefined) {
        const logged = localStorage.getItem("logged");
        if (!logged) {
          if (uriRedirect !== undefined)
            this.props.history.push("/auth", { uriRedirect: uriRedirect });
          else
            this.props.history.push("/auth");
        }
    }

    render() {
        return (
            <Switch>
                <Route render={routeProps => {
                    return(
                        <Dashboard {...routeProps}                        
                        />
                    )
                }}/>
            </Switch>
        );
    }
}

export default Home;