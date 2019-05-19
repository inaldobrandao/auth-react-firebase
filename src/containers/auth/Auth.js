import React,{ Component } from 'react';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import "./Auth.css"
import FirebaseAuthService from '../../services/FirebaseAuthService';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

class Auth extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            showLogin: true,
            openDialog: false,
            activeDialogResetPassword: false,
            email: "",
            openSnackbar: false,
            messageSnackbar: "",
            timeSnackbar: 2000,
            classSnackbar: ""
        }
    }

    componentWillMount(){
        if(localStorage.getItem("logged") === "true"){
            this.props.history.push("/");
        }
    }

    hendleLogin = () => {
        this.setState({ showLogin: true })
    }

    hendleRegister = () => {
        this.setState({ showLogin: false })
    }

    authGoogle = () => {
        FirebaseAuthService.authExternal("google", this.successAuth)
    }
    
    authFacebook = () => {
        FirebaseAuthService.authExternal("facebook", this.successAuth)
    }

    successAuth = () => {
        localStorage.setItem("logged", "true")
        this.props.history.push("/");
    }

    resetPassword = () => {
        this.handleClickOpenDialog();
    }

    confirmResetPassword = (email) => {
        FirebaseAuthService.sendEmailResetPassword(email, this.resetPasswordCallback)
    }

    resetPasswordCallback = (result) => {
        this.handleCloseDialog();
        if(result){
            this.handleSnackbar('Email enviado com sucesso :).', 'snackbar-success', 3000)
        }else{            
            this.handleSnackbar('Falha ao enviar o email :(.', 'snackbar-error', 3000)
        }
    }

    handleClickOpenDialog = () => {
        this.setState({ openDialog: true, activeDialogResetPassword: true });
    };
    
    handleCloseDialog = () => {
        this.setState({ openDialog: false, activeDialogResetPassword: false });
    };

    handleChangeTextField = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSnackbar = (message, theme, time) => {
        this.setState({ messageSnackbar: message, classSnackbar: theme, timeSnackbar: time, openSnackbar: true })
    }
    
    closeSnackbar = () => {        
        this.setState({ openSnackbar: false, messageSnackbar: "", classSnackbar: "" })          
    }

    render(){
        const { showLogin } = this.state;

        return(
            <div className="auth">
                <div className="auth-content">
                    <div className="social-btns grid-list">
                        <span className="google-span">
                            <Button className="google-btn" onClick={this.authGoogle}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="google-svg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                                <span className="google-span-text">Google</span>
                            </Button>
                        </span>
                        <span className="facebook-span">
                            <Button className="facebook-btn" onClick={this.authFacebook}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" className="facebook-svg" color="#ffffff"><path fill="#ffffff" d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1 11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2 15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
                                <span className="facebook-span-text">Facebook</span>
                            </Button>
                        </span>
                    </div>
                    { showLogin ? <Login history={this.props.history} resetPassword={this.resetPassword} hendleRegister={this.hendleRegister} /> 
                    : <Register history={this.props.history} hendleLogin={this.hendleLogin} /> }
                </div>

                {this.state.activeDialogResetPassword &&
                 <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Recuperação de Senha</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Digite seu email para que possamos lhe enviar um link de recuperação.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleChangeTextField('email')}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => this.confirmResetPassword(this.state.email)} color="primary">
                            Enviar
                        </Button>
                    </DialogActions>
                </Dialog>
                }

                <Snackbar
                    className={this.state.classSnackbar}
                    open={this.state.openSnackbar}
                    TransitionComponent={Fade}
                    autoHideDuration={this.state.timeSnackbar}
                    onClose={this.closeSnackbar}
                    ContentProps={{
                        'aria-describedby': 'snackbar-message-id',
                    }}
                    message={<span id="snackbar-message-id">{this.state.messageSnackbar}</span>}
                />
            </div>
        )
    }
}

export default Auth;