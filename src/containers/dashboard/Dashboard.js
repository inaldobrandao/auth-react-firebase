import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import FirebaseAuthService from '../../services/FirebaseAuthService';

class Dashboard extends Component {

    constructor(props){
        super(props);
    }

    signOut = () =>{
        FirebaseAuthService.signOut(this.signOutSuccess);        
    }

    signOutSuccess = (response) => {
        if(response){
            this.props.history.push("/");
        }
    }

    render(){

        return(
            <div>
                <Button onClick={this.signOut}>Sair</Button>
            </div>
        );
    }
}

export default Dashboard;