import React from 'react';
import './App.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Blocklist from './layout/Blocklist';

function App() {
  return (
    <div className='App'>
      <Header />
      <section className='content'>
        {/* TODO: notifaction */}
        <Blocklist />
      </section>
      <Footer />
    </div>
  );
}

export default App;
