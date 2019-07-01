import React from 'react';
import './Meme.css';

class Meme extends React.Component {
  componentDidMount(){
    console.log('Meme mount');
  }

  componentWillUnmount(){
    console.log('Meme unmount');
  }

  render(){
    return (
      <div className='Meme Page'>
        Meme Coming Soon...
      </div>
    );
  }
};

export default Meme;