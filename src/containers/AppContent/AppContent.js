import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './containers-app/Header/Header.jsx';
import LeftNavBar from './containers-app/LeftNavBar/LeftNavBar.jsx';
import Main from './containers-app/Main/Main.jsx';
import RightNavBar from './containers-app/RightNavBar/RightNavBar.jsx';
import Footer from './containers-app/Footer/Footer.jsx';

import './AppContent.css';

class AppComponent extends Component {
  state = { 
    leftDivClassName: 'left-visible-div',
    rightDivClassName: 'right-visible-div'
   }

   handleRightOnClick = () => {
    let current = this.state.rightDivClassName === 'right-visible-div' ? 'right-hidden-div' : 'right-visible-div';
    this.setState({
      rightDivClassName: current
    })
  };

   handleLeftOnClick = () => {
    let current = this.state.leftDivClassName === 'left-visible-div' ? 'left-hidden-div' : 'left-visible-div';
    this.setState({
      leftDivClassName: current
    })
  };

  render() {
    return (
      <div className='container' style={{position: 'relative'}}>
        <Header />
        <div className='main-container'>
          <LeftNavBar divClassName={this.state.leftDivClassName}/>
          <Main />
          <RightNavBar divClassName={this.state.rightDivClassName}/>
        </div>
        <Footer />
        <button onClick={this.handleLeftOnClick}>changeLeft</button>
        <button onClick={this.handleRightOnClick}>changeRight</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)