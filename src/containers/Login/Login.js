import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/auth'; 
import { Link } from 'react-router-dom';
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
    
  onEnter(value, key) {
    if(key === 13) {
        this.login();
        }
    }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'success'){
        this.props.history.push("/full");
    }
  }
  
  render() {
    const hideAutoFillColorStyle = {
        WebkitBoxShadow: '0 0 0 1000px white inset',
        WebkitAutofill: "off" 
      };
    return (
        <div className="general" style={{display: "flex", justifyContent: "center", alignItems: "center",height: "100vh"}}>        
            <div className="container" style={{display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: "300px"}}>
                <div   className="input-container"
                            onKeyDown={(e) => this.onEnter( e.target.value, e.keyCode)}>
                    <textarea 
                        value={this.state.email}  
                        onChange={this.handleChangeEmail} 
                        floatingLabelText="Login" 
                        inputStyle={hideAutoFillColorStyle}
                    />
                    <textarea 
                        type="password"
                        value={this.state.password}  
                        onChange={this.handleChangePassword} 
                        floatingLabelText="Password"
                        inputStyle={hideAutoFillColorStyle}
                        autoComplete="off"
                    /> 
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button onClick={this.login} className="login-button" label="Login" primary={true} />
                    <Link className="link_login" style={{ color: '#fff', backgroundColor: "rgb(0, 188, 212)",}} to='/register'>Register</Link>
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

