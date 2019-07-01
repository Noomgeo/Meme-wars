const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use( express.static('build') );
app.use( express.json() );


// connect to db


app.post('/meme', (req, res)=> {
  // save to db
  res.status(500).send('no db connection yet');
});

app.get('/meme', (req, res)=>{
  res.json([]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));