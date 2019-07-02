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

  login = ()=> {
    console.log('pretend to check password');
    this.setState({ toVote: true })
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
        </div>
      </div>
    );
  }
};

export default Login;