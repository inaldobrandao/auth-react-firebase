import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

class Home extends Component {

    constructor(props){
        super(props);
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