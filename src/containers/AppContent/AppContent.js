import React, { Component } from 'react';

import Header from './containers-app/Header/Header.jsx';
import LeftNavBar from './containers-app/LeftNavBar/LeftNavBar.jsx';
import Main from './containers-app/Main/Main.jsx';
import Footer from './containers-app/Footer/Footer.jsx';

import './AppContent.css';

class AppComponent extends Component {
  

  render() {
    return (
      <div className='container'>
        <Header />
        <div className='main-container'>
          <LeftNavBar />
          <Main />
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppComponent