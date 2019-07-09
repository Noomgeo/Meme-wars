import React from 'react';
import { Redirect } from 'react-router-dom'
import './Login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    toVote: false,
  }

  setUsername = event =>
    this.setState({ username: event.target.value })

  setPassword = event =>
    this.setState({ password: event.target.value })

  signup = ()=> {
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(responseJson => {
        localStorage.sessionToken = responseJson.token;
        this.setState({ toVote: true });
      });
  }


  login = ()=> {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        if( response.status >= 400 ) return Promise.reject();
          return response.json();
    })
      .then(responseJson => {
        localStorage.sessionToken = responseJson.token;
        this.setState({ toVote: true });
      })
      .catch(()=> console.log('Login failed'))
  }

  componentDidMount(){
    console.log('Login mount');
  }

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    if ( this.state.toVote ) return (<Redirect to='/vote'/>)
    return (
      <div className='Login Page'>
        <div className='login-box'>
          <label>
            <span>Username</span>
            <input value={this.state.username}
                   onChange={this.setUsername}/>
          </label>
          <label>
            <span>Password</span>
            <input type='password'
                   value={this.state.password}
                   onChange={this.setPassword}/>
          </label>
          <button onClick={this.login}>Login</button>
          <button onClick={this.signup}>Signup</button>
        </div>
      </div>
    );
  }
};

export default Login;