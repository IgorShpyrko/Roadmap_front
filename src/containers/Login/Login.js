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
      this.props.history.push('/AppContent');
    }
  }
  
  render() {
    return (
      <div 
        className="general" 
        style={{
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          height: "100vh"
        }}>        
        <div 
          className="container" 
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px"
          }}>
          <form id='login-form' autoComplete='off'>
            <input
              style={{
                height: '26px',
                width: '300px',
                margin: '5px'
              }}
              value={this.state.email}
            type="text"
            placeholder="Log name"
            onChange={this.handleChangeLogin}/>
            <input 
              style={{
                height: '26px',
                width: '300px',
                margin: '5px'
              }}
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={this.handleChangePassword}/>
          </form>
          <div 
            style={{
              display: "flex", 
              justifyContent: "space-between",
              padding: '5px'
            }}>
            <button 
              className="login-button" 
              onClick={this.login}
              style={{ 
                color: '#fff', 
                backgroundColor: "rgb(0, 188, 212)",
                height: '36px',
                width: '200px',
                border: 'none',
                borderRadius: '3px',
              }}>
              Log In
            </button>
            &nbsp;
            <Link 
            className="link_login" 
            style={{ 
              color: '#fff', 
              backgroundColor: "rgb(0, 188, 212)"
            }} 
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

