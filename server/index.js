const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const ORM = require('sequelize');
const connection = new ORM('postgres://memewars:password@localhost:5432/memewars');

const modelsFactory = require('./models');
const { User, Meme, Vote } = modelsFactory(connection, ORM);

app.use ( express.static('build') );
app.use( express.json() );


const api = require('./api')(app, { User, Meme, Vote });

connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use( express.static('build') );
app.use( express.json() );

app.get('/hydrate', (req, res)=> {
  let users = [
  { name: 'nik' }, {name: 'avi' }, {name: 'dan' },
  ];

  let memes = [
  'https://media.discordapp.net/attachments/576550326509764619/589870367968067584/Snapchat-1663181687.jpg?width=725&height=666',
  'https://cdn.discordapp.com/attachments/576550326509764619/587878048087539713/image0.jpg',
  'https://www.abeautifulsite.net/uploads/2014/08/a-user-interface-is-like-a-joke.jpg',
  'http://theawkwardyeti.com/wp-content/uploads/2015/01/0121_Heartwatchesthenews.png',
  ];

  // sync table
  User.sync({ force: true })
    .then(()=> Meme.sync({ force: true }))
    .then(()=> Vote.sync({ force: true }))
    .then(()=> User.bulkCreate(users, { returning: true}))
    .then((userResponse)=>{
      users = userResponse.map(user => user.dataValues);
    })
    .then(() => memes.map((imgUrl, i)=> ({
      imgUrl, author: users[i % users.length].id
    })))
    .then((memesWithAuthor)=> Meme.bulkCreate(memesWithAuthor, { returning: true}))
    .then(memesResponse=> {
      memes = memesResponse.map(meme => meme.dataValues);
    })
    .then(()=>{

      let votes = [];
      for(let i=0; i<100; i++){
        votes.push({
          winner: memes[Math.floor(Math.random()*memes.length)].id,
          loser: memes[Math.floor(Math.random()*memes.length)].id,
          voter: users[i % users.length].id,
        })
      }
      return Vote.bulkCreate(votes);
    })
    .then(()=> res.json({ message: 'Successfully creating User, Meme, Vote tables' }))
    .catch(err => res.status(500).json({ message: JSON.stringify(err) }))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));