module.exports = (app, { User, Meme, Vote})=> {

	app.post('/user', (req, res)=>{
	User.create(req.body)
		.then (()=> res.json({ message: 'User created' }))
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: JSON.stringify(err) })
		});
	});

	app.get('/user/:id', (req, res)=> {
		User.findByPk(1*req.params.id)
			.then(user => res.json(user));
	});
	// connect to db

	app.post('/meme', (req, res)=> {
	  // save to db
	  	Meme.create(req.body)
			.then (()=> res.json({ message: 'Meme created' }))
			.catch(err => {
				console.error(err);
				res.status(500).json({ message: JSON.stringify(err) })
			});
	});

	app.get('/meme/:id', (req, res)=>{
		Meme.findByPk(1*req.params.id)
			.then(meme => res.json(meme));
	});

	app.post('/vote', (req, res)=>{
		Vote.create(req.body)
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
}