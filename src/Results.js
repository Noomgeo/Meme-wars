import React from 'react';
import './Results.css';

class Results extends React.Component {
  state = {
      winners: [],
  }


  componentDidMount(){
    console.log('Result mount');
    Promise.all([
      fetch('/meme').then(response=> response.json()),
      fetch('/vote').then(response=> response.json())
    ]).then(([memes, votes]) => this.setState({
      votes, memes,
      winners: memes.map((meme)=> {
        const total = votes.filter(vote => (
          meme.id === vote.winner || meme.id === vote.loser)).length;

        const winning = votes.filter(vote => (
          vote.winner === meme.id)).length;

        return { percentage: winning / total, imgUrl: meme.imgUrl };  
      }).sort((ma, mb)=> ma.percentage < mb.percentage ? 1 : -1),
    })); 
  }

  componentWillUnmount(){
    console.log('Results unmount');
  }

  render(){
    return (
      <div className='Results Page'>
        <div style={{ display: 'flex' }}>
          <div>
            Winners:
              <ul>
                {this.state.winners
                  .slice(0,3)
                  .map(meme=>(
                  <li key={meme.imgUrl}>
                    <img src={meme.imgUrl}/>
                  </li>
                ))}
              </ul>
          </div>
          <div>
            Losers:
              <ul>
                {this.state.winners
                  .slice(-3).reverse()
                  .map(meme=>(
                  <li key={meme.imgUrl}>
                    <img src={meme.imgUrl}/>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Results;