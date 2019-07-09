const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
	const authHeader = req.get('Authorization') || '';

	const token = authHeader.split(' ')[1];

	jwt.verify(token, 'jwt secret code', (err, decoded)=>{
		if( err ) return res.status(401).json({ message: 'Authentification failed' });
		else {
			req.session = decoded;
			next();
		}
	})
};