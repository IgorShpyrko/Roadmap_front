import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginAction } from '../../actions/auth'; 

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: '',
        password: ''
    };
  }

  login = () => {
    this.props.loginFunction(this.state.email, this.state.password);
  }
    
  handleChangeLogin = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'success'){
      this.props.history.replace('/');
    }
  }
  
  render() {
    return (
      <div 
        className='general' 
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100vh'
        }}>        
        <div className='login-container'>
          <form id='login-form' autoComplete='off'>
            <input className='login-input'
              value={this.state.email}
              type='text'
              placeholder='Log name'
              onChange={this.handleChangeLogin}/>
            <input className='pswrd-input'
              value={this.state.password}
              type='password'
              placeholder='Password'
              onChange={this.handleChangePassword}/>
          </form>
          <div className='login-control-btns'>
            <button className='login-btn' onClick={this.login}>
              Log In
            </button>
            &nbsp;
            <Link 
              className='link_login' 
              style={{ color: '#fff', backgroundColor: 'rgb(0, 188, 212)'}} 
              to='/register'>
                Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    token: state.auth.token,
    status: state.auth.status
  };
}
function mapDispathToProps(dispatch) {
  return {
    loginFunction: function (email, password) {
      dispatch(loginAction(email, password));
    },
  };
}

export default connect(mapStateToProps,mapDispathToProps)(Login);
