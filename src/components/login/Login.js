import React,{ Component } from 'react';
import "./Login.css";
import { Field, reduxForm } from 'redux-form';
import SimpleTextField from '../materialComponents/SimpleTextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FirebaseAuthService from '../../services/FirebaseAuthService';
import { Link } from 'react-router-dom';

const validate = (values, props) => {
    // const errors = {};
    // const requiredFields = ['userName', 'password'];
    // requiredFields.forEach(field => {
    //   if (!values[field]) {
    //     const idMessage = field === 'userName' ? "input.email.error.required" : "input.password.error.required";
    //     errors[field] = props.intl.formatMessage({ id: idMessage });
    //   }
    // })
    // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = props.intl.formatMessage({ id: "input.email.error.invalid" });
    // }
    // return errors;
  }

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          typeInput: 'password',
          typeInputState: true,
          icone: 'eye-outline',
          formValid: false,
          messageError: '',
          errorSubmiting: false,
          loadingSendLogin: false,
          uriRedirect: props.uriRedirect
        }
    }

    componentDidMount() {
        this.props.reset();
        localStorage.clear();
    }

    handleSubmit = (values) => {
        localStorage.clear();
        FirebaseAuthService.login(values, this.successLogin)
    }

    successLogin = (user) => {
        this.props.history.push('/')
    }

    renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => {
        return <SimpleTextField props={{ input, label, type, touched, error, custom }} />
    }

    render(){
        const { handleSubmit, pristine, submitting, valid } = this.props;
        const { typeInput, icone } = this.state;
        
        return(
            <div className="login">
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <Field
                        name="userName"
                        component={this.renderField}
                        type="text"
                        label="Email"
                    />
                    <div className="submit-line">
                        <span className={`mdi mdi-${icone} password-icon`} onClick={this.showPassword}></span>
                        <Field
                            className="textField"
                            name="password"
                            component={this.renderField}
                            type={typeInput}
                            label="Senha"
                        />
                    </div>
                    <Link to={"/forgot-password"} className="remerber-password">
                        Esqueci a senha.
                    </Link>
                    <Button type="submit" variant="contained" className="btn-submit submit-login" disabled={(pristine || submitting || !valid)}>
                        {!this.state.loadingSendLogin
                        ? "Entrar"
                        : <CircularProgress className="loading-send" size={20} />
                        }
                    </Button>
                </form>
                <span onClick={this.props.hendleRegister}>Não possui conta? Cadastre-se aqui.</span>
            </div>
        )
    }
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(Login);
