import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

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
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/AppContent' component={AppContent} />
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
