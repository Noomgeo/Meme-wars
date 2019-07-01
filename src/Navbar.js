import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ()=> (
  <div className='Navbar'>
    <h1>MEME WARS</h1>
    <ul className='nav-links'>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/meme'>Meme</Link>
      </li>
      <li>
        <Link to='/Vote'>Vote</Link>
      </li>
      <li>
        <Link to='/Results'>Results</Link>
      </li>
    </ul>
  </div>
);

export default Navbar;