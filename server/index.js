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
  // sync table
  User.sync({ force: true })
  .then(()=> Meme.sync({ force: true }))
  .then(()=> Vote.sync({ force: true }))
  .then(()=> res.json({ message: 'Successfully creating User, Meme, Vote tables' }))
  .catch(err => res.status(500).json({ message: JSON.stringify(err) }))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));