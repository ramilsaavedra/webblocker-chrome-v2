import React from 'react';
import './App.css';
import { NotificationProvider } from './context/NotificationContext';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Blocklist from './layout/Blocklist';
import NotificationWrap from './layout/NotificationWrap';
import Redirect from './layout/Redirect';
import ScheduleBlocking from './layout/ScheduleBlocking';

function App() {
  return (
    <NotificationProvider>
      <Header />
      <section className='content'>
        <NotificationWrap />
        <Blocklist />
        <hr />
        <Redirect />
        <hr />
        <ScheduleBlocking />
      </section>
      <Footer />
    </NotificationProvider>
  );
}

export default App;
