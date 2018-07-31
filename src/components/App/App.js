import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import AppContent from '../App/AppContent/AppContent';

import { checkAuthAction, getCheckAdminAction } from '../../actions/auth';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthFunction(this.props.token);
    
  }
  componentWillMount(){
    this.props.getCheckAdminFunction();
  }

  render() {
    const { checkAdmin } = this.props

    return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/login' 
          render = {(props) => (!checkAdmin ? <Login {...props}/> : 
              ( <Redirect to='/' /> )
            )} 
          />
          <Route path='/register' component={Register}/>
          <Route path='/' render = {(props) => (checkAdmin ? <AppContent {...props}/> :
            ( <Redirect to='/login' /> ) 
            )} 
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { 
    token: state.auth.token,
    checkAdmin: state.auth.checkAdmin,
  };
}
function mapDispathToProps(dispatch) {
  return {
    checkAuthFunction: () => {
      dispatch(checkAuthAction());
    },
    getCheckAdminFunction: () => {
      dispatch(getCheckAdminAction());
    }
  };
}

export default connect(mapStateToProps,mapDispathToProps)(App);
