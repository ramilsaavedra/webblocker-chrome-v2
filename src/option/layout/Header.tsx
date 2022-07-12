import React from 'react';
import logo from '../../../public/images/Logo-48.png';

const Header = () => {
  return (
    <header>
      <section className='header'>
        <img id='logo' src={logo} alt='Web Blocker' />
        <h1>Web Blocker</h1>
      </section>
    </header>
  );
};
export default Header;
