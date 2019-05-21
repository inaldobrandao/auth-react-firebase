import React, { Component } from 'react';
import "./Register.css";
import { Field, reduxForm } from 'redux-form';
import SimpleTextField from '../materialComponents/SimpleTextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const validate = (values, props) => {
    const errors = {};
    const requiredFields = ['name', 'userName', 'password'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        const Message = field === 'userName' ? "Email obrigatório"
          : field === 'name' ? "Nome Obrigatório" : "Senha obrigatória";
        errors[field] = Message;
      }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email inválido";
    }
    if (values.password !== undefined) {
      if (values['password'].length < 6) {
        errors['password'] = "Deve ter no mínimo 6 caracteres.";
      }
    }
    return errors;
  }

class Register extends Component {

    constructor(props) {
      super(props);
      this.state = {
        typeInput: 'password',
        typeInputState: true,
        icone: 'eye-outline',
        errorSubmiting: false,
        messageError: '',
        loadingSendRegister: false,
        valuesForm: []        
      }
    }

    renderField({ input, label, type, meta: { touched, error }, ...custom }) {
        return <SimpleTextField props={{ input, label, type, touched, error, custom }} />
    }

    showPassword = () => {
      if (this.state.typeInputState === true) {
        this.setState({ typeInput: 'text', typeInputState: false, icone: 'eye-off-outline' });
      } else {
        this.setState({ typeInput: 'password', typeInputState: true, icone: 'eye-outline' });
        this.setState({});
      }
    }

    render(){
        const { handleSubmit, pristine, submitting, valid } = this.props;
        const { typeInput, icone } = this.state;

        return(
            <div className="register">
                <form onSubmit={handleSubmit(this.props.handleSubmitRegister)}>
                  <Field name="name" component={this.renderField} type="text" label="Nome" />
                  <Field name="userName" component={this.renderField} type="text" label="Email" />
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

                  <Button type="submit" variant="contained" className="btn-submit" id="btn-submit"
                      disabled={(pristine || submitting || !valid)}>
                      {!this.state.loadingSendRegister
                      ? "Cadastrar"
                      : <CircularProgress className="loading-send" size={20} />
                      }
                  </Button>
                </form>
                <span className="redirect-login" onClick={this.props.hendleLogin}>Já possui uma conta? Clique aqui.</span>
            </div>
        )
    }
}

export default reduxForm({
    form: 'RegisterForm',
    validate
})(Register);