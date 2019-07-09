const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const auth = require('./auth');

module.exports = (app, { User, Meme, Vote})=> {

	app.post('/login', (req, res)=>{
		const passwordHash = crypto.pbkdf2Sync(req.body.password, 'secret code', 100, 64, 'sha512')
                             .toString('hex')
        
        User.findOne({ where: { name: req.body.username }})
        	.then(userResponse => {
        		if( userResponse &&
        			(userResponse.dataValues.passwordHash === passwordHash) ){
        			//make a session token, send it back to user
        		  jwt.sign({
        			userId: userResponse.dataValues.id,
        			username: userResponse.dataValues.name,
        		  }, 'jwt secret code', (err, token)=>{
        			res.json({ token: token });
        		  });
        		} else {
        			res.status(401).json({ message: 'Login failed' });
        		}
        	})
	});

	app.post('/user', (req, res)=>{
		const passwordHash = crypto.pbkdf2Sync(req.body.password, 'secret code', 100, 64, 'sha512')
                             .toString('hex')

		User.create({name: req.body.username, passwordHash: passwordHash })
			.then((userResponse)=> {
				jwt.sign({
		    		userId: userResponse.dataValues.id,
		    		username: userResponse.dataValues.name,
		    	}, 'jwt secret code', (err, token)=>{
					res.json({
						message: 'User created',
						token: token,
					});
				});
			})
			.catch(err => {
				res.status(500).json({ message: JSON.stringify(err) })
			});
		});

	app.get('/user/:id', (req, res)=> {
		User.findByPk(1*req.params.id)
			.then(user => res.json(user));
	});
	// connect to db

	app.post('/meme', auth, (req, res)=> {
	  // save to db
	  	Meme.create({
	  		imgUrl: req.body.imgUrl,
	  		author: req.session.userId,
	  	})
			.then (()=> res.json({ message: 'Meme created' }))
			.catch(err => {
				res.status(500).json({ message: JSON.stringify(err) })
			});
	});

	app.get('/meme/:id', (req, res)=>{
		Meme.findByPk(1*req.params.id)
			.then(meme => res.json(meme));
	});

	app.get('/meme', (req, res)=> {
		Meme.findAll().then(memes => {
			res.json(memes);
		})
	});

	app.post('/vote', auth, (req, res)=>{
		Vote.create({
		  winner: req.body.winner,
		  loser: req.body.loser,
		  voter: req.session.userId,
		})
			.then (()=> res.json({ message: 'Vote created' }))
			.catch(err => {
				console.error(err);
				res.status(500).json({ message: JSON.stringify(err) })
			});
	});

	app.get('/vote/:id', (req, res)=> {
		Vote.findByPk(1*req.params.id)
			.then(vote => res.json(vote));
	});

	app.get('/vote', (req, res)=> {
		Vote.findAll().then(votes => {
			res.json(votes);
		})
	});
}