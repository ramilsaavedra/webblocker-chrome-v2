import React, { useContext } from 'react';
import './App.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Blocklist from './layout/Blocklist';
import NotificationWrap from './layout/NotificationWrap';
import Redirect from './layout/Redirect';

import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Header />
      <section className='content'>
        <NotificationWrap />
        <Blocklist />
        <hr />
        <Redirect />
      </section>
      <Footer />
    </NotificationProvider>
  );
}

export default App;
