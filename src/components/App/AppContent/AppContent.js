import React, { Component } from 'react';

import Header from './containers-app/Header/Header.jsx';
import Menu from './containers-app/Menu/Menu.jsx';
import Main from './containers-app/Main/Main.jsx';
import Footer from './containers-app/Footer/Footer.jsx';


import './AppContent.css';

class AppComponent extends Component {
  state = {
    navClassName: 'left-visible-nav',
    mainClassName: 'main-collapsed'
  };

  handleToggle = () => {
    let currentNavName = this.state.navClassName === 'left-visible-nav' ? 'left-hidden-nav' : 'left-visible-nav';
    let currentMainName = this.state.mainClassName === 'main-collapsed' ? 'main-full' : 'main-collapsed';

    this.setState({
      navClassName: currentNavName,
      mainClassName: currentMainName
    })
  }

  render() {
    return (
      <div className='container'>
        <Header handleToggle={this.handleToggle}/>
        <div className='main-container'>
          <Menu navClassName={this.state.navClassName} handleToggle={this.handleToggle} />
          <Main mainClassName={this.state.mainClassName}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppComponent