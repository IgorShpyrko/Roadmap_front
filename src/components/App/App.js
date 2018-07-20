import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, BrowserRouter} from 'react-router-dom';

import NoAuthRoute from '../Routes/auth-route';
import AuthRoute from '../Routes/auth-route';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import AppContent from '../../containers/AppContent/AppContent';

import { checkAuthAction, getCheckAdminAction } from '../../actions/auth';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthFunction(this.props.token);
    
  }
  componentWillMount(){
    this.props.getCheckAdminFunction();
  }

  render() {
    return (
      <BrowserRouter>      
        <Switch>
          <NoAuthRoute exact path='/' component={Login}/>
          <NoAuthRoute  path='/register' component={Register}/>
          <AuthRoute path="/" component={AppContent} />
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
