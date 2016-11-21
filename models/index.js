
const Sequelize = require('sequelize')


var db = new Sequelize("postgres://localhost:5432/tomidb", {logging: false})



var User = db.define("user", {
	name: {
		type:Sequelize.STRING,
		allowNull: false
	},
	age: {
		type:Sequelize.INTEGER,
		allowNull: false
	},
	sex: {
		type:Sequelize.ENUM("M", "F"),
		allowNull: false
	}
})

var Pet = db.define("pet", {
	name: {
		type:Sequelize.STRING,
		allowNull: false
	},
	type: {
		type:Sequelize.STRING,
		allowNull: false
	}
})

Pet.belongsTo(User)
User.hasMany(Pet)


module.exports = {
	User:User,
	Pet:Pet
}