import React from 'react';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

import Navbar from './Navbar';
import Login from './Login';
import Meme from './Meme';
import Vote from './Vote';
import Results from './Results';


export default ()=> (
  <Router>
    <div>
      <Navbar />

      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/meme' component={Meme} />

        <Route exact path='/vote' component={Vote} />
        <Route exact path='/results' component={Results} />
        <Redirect from='/' to='/login' />
      </Switch>

      <footer></footer>
    </div>
  </Router>
);