import React from 'react';
import './Login.css';

class Login extends React.Component {
  componentDidMount(){
    console.log('Login mount');
  }

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    return (
      <div className='Login Page'>
        Login Coming Soon...
      </div>
    );
  }
};

export default Login;