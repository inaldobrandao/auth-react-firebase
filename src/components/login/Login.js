import React,{ Component } from 'react';
import "./Login.css";
import { Field, reduxForm } from 'redux-form';
import SimpleTextField from '../materialComponents/SimpleTextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const validate = (values, props) => {
    const errors = {};
    const requiredFields = ['userName', 'password'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        const Message = field === 'userName' ? "Email obrigatório" : "Senha obrigatória";
        errors[field] = Message;
      }
    })
    if (values.password !== undefined) {
        if (values['password'].length < 6) {
          errors['password'] = "Deve ter no mínimo 6 caracteres.";
        }
      }
    if (values.userName && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
      errors.userName = "Email inválido";
    }
    return errors;
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

    renderField = ({ input, label, type, meta: { touched, error }, ...custom }) => {
        return <SimpleTextField props={{ input, label, type, touched, error, custom }} />
    }

    render(){
        const { handleSubmit, pristine, submitting, valid } = this.props;
        const { typeInput, icone } = this.state;
        
        return(
            <div className="login">
                <form onSubmit={handleSubmit(this.props.handleSubmitLogin)}>
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
                    <span onClick={this.props.resetPassword} className="reset-password">
                        Esqueceu a senha?
                    </span>
                    <Button type="submit" variant="contained" className="btn-submit submit-login" disabled={(pristine || submitting || !valid)}>
                        {!this.state.loadingSendLogin
                        ? "Entrar"
                        : <CircularProgress className="loading-send" size={20} />
                        }
                    </Button>
                </form>
                <span className="redirect-register" onClick={this.props.hendleRegister}>Não possui conta? Cadastre-se aqui.</span>
            </div>
        )
    }
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(Login);
