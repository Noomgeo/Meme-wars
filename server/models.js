module.exports = (connection, ORM)=> {
	const User = connection.define('user', {
		id: {
			type: ORM.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: ORM.TEXT,
			allowNull: false,
			unique: true,
		},
	}, { freezeTableName: true });

	const Meme = connection.define('meme', {
		id: {
			type: ORM.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		imgUrl: {
			type: ORM.TEXT,
			allowNull: false,
		},
		author: {
			type: ORM.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	}, { freezeTableName: true });

	const Vote = connection.define('vote', {
		id: {
			type: ORM.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		voter: {
			type: ORM.INTEGER,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		winner: {
			type: ORM.INTEGER,
			allowNull: false,
			references: {
				model: 'meme',
				key: 'id',
			},
		},
		loser: {
			type: ORM.INTEGER,
			allowNull: false,
			references: {
				model: 'meme',
				key: 'id',
			},
		},
	}, { freezeTableName: true });

	return { User, Meme, Vote };
};