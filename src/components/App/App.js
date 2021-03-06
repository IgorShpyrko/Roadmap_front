import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from 'components/Login/Login';
import Register from 'components/Register/Register.jsx';
import AppContent from 'components/App/AppContent/AppContent';

import { checkAuthAction, getCheckAdminAction } from 'actions/auth';
import { getUserById } from 'actions/getUserById';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthFunction(this.props.token);
  }
  
  componentWillMount() {
    this.props.getCheckAdminFunction();
  }

  render() {
    const { checkAdmin, user} = this.props;
    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' 
            render = {(props) => (!user ? <Login {...props}/> : 
              ( <Redirect to='/' /> )
            )} 
          />
          <Route path='/register' component={Register}/>
          <Route path='/' render = {(props) => (checkAdmin ? <AppContent {...props}/> :
            ( user ? <AppContent {...props}/> : <Redirect to='/login' /> ) 
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
    user: state.auth.user ? state.auth.user : null
  };
}
function mapDispathToProps(dispatch) {
  return {
    checkAuthFunction: () => {
      dispatch(checkAuthAction());
    },
    getCheckAdminFunction: () => {
      dispatch(getCheckAdminAction());
    },
    getUserById: (id) => {
      dispatch(getUserById(id));
    }
  };
}

export default connect(mapStateToProps, mapDispathToProps)(App);
