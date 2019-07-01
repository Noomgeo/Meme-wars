import React from 'react';
import './Vote.css';

class Vote extends React.Component {
  componentDidMount(){
    console.log('Vote mount');
  }

  componentWillUnmount(){
    console.log('Vote unmount');
  }

  render(){
    return (
      <div className='Vote Page'>
        Vote Coming Soon...
      </div>
    );
  }
};

export default Vote;