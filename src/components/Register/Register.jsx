import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginAction } from 'actions/auth';
import { registerAction } from 'actions/register';

import './Register.css'

class Register extends Component {
  state = { 
    registerName: '',
    registerEmail: '',
    loginEmail: '',
    registerPassword: '',
    loginPassword: '',
    confirmRegisterPassword: '',
    warningLoginMessage: '',
    warningEmailMessage: '',
    warningPasswordMessage: '',
    warningConfirmPasswordMessage: ''
  }

  static getDerivedStateFromProps(props){
    console.log(props)

    if(props.registerStatus === 'success'){
      props.history.replace('/');
      return true
    }

    if(props.status === 'success'){
      props.history.replace('/');
      return true
    }
    return null
  }

  sendRegistrationData = () => {
    const {
      registerName,
      registerEmail,
      registerPassword,
      warningLoginMessage,
      warningEmailMessage,
      warningPasswordMessage,
      warningConfirmPasswordMessage
    } = this.state;

    if(warningLoginMessage === '' && warningEmailMessage === '' && warningPasswordMessage === '' && warningConfirmPasswordMessage === ''){
      this.props.registerFunction(
        registerEmail,
        registerPassword,
        registerName
      )
    }
  }


  login = () => {
    this.props.loginFunction(this.state.loginEmail, this.state.loginPassword);
  }

  handleChangeRegisterConfirmPassword = (e) => {
    let regCheckPassword = /^[a-zA-Z0-9]+$/;

    this.setState({
      confirmRegisterPassword: e.target.value
    })

    if(e.target.value === ''){
      this.setState({
        warningConfirmPasswordMessage: 'Comfirm Password field is necessarily to fill'
      })
    } else if(!regCheckPassword.test(e.target.value)){
      this.setState({
        warningConfirmPasswordMessage: 'Do not use symbols in password'
      })
    }
    else if(regCheckPassword.test(e.target.value)){
      this.setState({
        warningConfirmPasswordMessage: ''
      })
    }
  }

  handleChangeRegisterPassword = (e) => {
    let regCheckPassword = /^[a-zA-Z0-9]+$/;

    this.setState({
      registerPassword: e.target.value
    })

    if(e.target.value === ''){
      this.setState({
        warningPasswordMessage: 'Password field is necessarily to fill'
      })
    } else if(!regCheckPassword.test(e.target.value)){
      this.setState({
        warningPasswordMessage: 'Do not use symbols in password'
      })
    }
    else if(regCheckPassword.test(e.target.value)){
      this.setState({
        warningPasswordMessage: ''
      })
    }
  }

  handleChangeRegisterUserEmail = (e) => {
    let regCheckEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    this.setState({
      registerEmail: e.target.value
    })
    if(e.target.value === ''){
      this.setState({
        warningEmailMessage: 'Email field is necessarily to fill'
      })
    } else if(!e.target.value.match(regCheckEmail)){
      this.setState({
        warningEmailMessage: 'incorrect Email'
      })
    } else if(e.target.value.match(regCheckEmail)){
      this.setState({
        warningEmailMessage: ''
      })
    }
  }

  handleChangeRegisterUserName = (e) => {
    let regCheckLogin = /^[a-zа-яА-ЯA-Z0-9 ]+$/;

    this.setState({
      registerName: e.target.value
    })

    if(e.target.value === ''){
      this.setState({
        warningLoginMessage: 'Login field is necessarily to fill'
      })
    } else if(e.target.value.length < 6) {
      this.setState({
        warningLoginMessage: 'Login field must contain at least 6 symbols'
      })
    } else if(!regCheckLogin.test(e.target.valuee)){
      this.setState({
        warningLoginMessage: 'Do not use symbols in login'
      })
    } else if(regCheckLogin.test(e.target.value)){
      this.setState({
        warningLoginMessage: ''
      })
    }

  }

  handleChangeLoginPassword = (e) => {
    this.setState({
      loginPassword: e.target.value
    })
  }

  handleChangeLoginName = (e) => {
    this.setState({
      loginEmail: e.target.value
    })
  }

  onKeyDown = (e) => {
    if(e.keyCode === 27) {
      this.props.history.replace('/login');
    }

    if(e.keyCode === 13) {
      this.sendRegistrationData()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown)
  }

  render() {

    console.log('render')

    const { loginEmail,
      loginPassword,
      registerName,
      registerEmail,
      registerPassword,
      confirmRegisterPassword,
      warningLoginMessage,
      warningEmailMessage,
      warningPasswordMessage,
      warningConfirmPasswordMessage
    } = this.state;

    return (
      <React.Fragment>
        <div className='register-wrapper'>

            <div className='register-login'>
              <form className='register-login-form'>
                <input className='register-login-input'
                  value={loginEmail}
                  type='text'
                  placeholder='Log name'
                  onChange={this.handleChangeLoginName}/>
                <input className='register-password-input'
                  value={loginPassword}
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChangeLoginPassword}/>
              </form>
              <button className='btn' onClick={this.login}>
                Log In
              </button>
            </div>

          <div className='register-container'>
            <h3 className='register-header'>Registration form</h3>
            <div >
               
              <div className='register-input-wrapper'>
                <input className='register-input'
                  autoComplete='nope'
                  value={registerName}
                  type='text'
                  placeholder='Enter your name'
                  onChange={this.handleChangeRegisterUserName}/>
                  <div className='register-warning'>{warningLoginMessage}</div>
              </div>
              <div className='register-email-wrapper'>
                <input className='register-input'
                  autoComplete='nope'
                  value={registerEmail}
                  type='email'
                  placeholder='Enter your email'
                  onChange={this.handleChangeRegisterUserEmail}/>
                  <div className='register-warning'>{warningEmailMessage}</div>
              </div>
              <div className='register-input-wrapper'>
                <input className='register-input'
                  autoComplete='off'
                  value={registerPassword}
                  type='password'
                  placeholder='Enter password'
                  onChange={this.handleChangeRegisterPassword}/>
                 <div className='register-warning'>{warningPasswordMessage}</div>
              </div>
              <div className='register-input-wrapper'>
                <input className='register-input' id='qwe'
                  autoComplete='off'
                  value={confirmRegisterPassword}
                  type='password'
                  placeholder='Confirm password'
                  onChange={this.handleChangeRegisterConfirmPassword}/>
                  <div className='register-warning'>{warningConfirmPasswordMessage}</div>
              </div>
              {registerPassword !== confirmRegisterPassword && <div className='register-warning'>passwords are not equal</div>}
            </div>
            <div className='register-control-btns'>
              <button 
                className='btn register-btn' 
                disabled={
                  warningLoginMessage === '' &&
                  warningEmailMessage === '' && 
                  warningPasswordMessage === '' && 
                  warningConfirmPasswordMessage === '' &&
                  registerName !== '' &&
                  registerEmail !== '' &&
                  registerPassword !== '' &&
                  confirmRegisterPassword !== '' ? false : true} 
                onClick={this.sendRegistrationData}
              >
                Register
              </button>
            </div>

          </div>          
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    status: state.auth.status,
    registerStatus: state.register.status
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginFunction: function (email, password) {
      dispatch(loginAction(email, password));
    },
    registerFunction: function (email, password, name) {
      dispatch(registerAction(email, password, name));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)