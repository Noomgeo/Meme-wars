import React from 'react';
import './Results.css';

class Results extends React.Component {
  componentDidMount(){
    console.log('Results mount');
    fetch('/meme', { 'Content-Type': 'application/json' })
      .then(response=> response.json())
      .then(memes => console.log(memes));
  }

  componentWillUnmount(){
    console.log('Results unmount');
  }

  render(){
    return (
      <div className='Results Page'>
        Results Coming Soon...
      </div>
    );
  }
};

export default Results;