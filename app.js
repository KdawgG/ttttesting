const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require ('nunjucks')
const sequelize = require('sequelize')
const volleyball = require ('volleyball')
const tomiroutes = require('./routes/tomiroutes')
const User = require("./models").User
const Pet = require("./models").Pet

var app = express();



app.use(volleyball)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set("view engine", 'html');
app.engine("html", nunjucks.render);
var env = nunjucks.configure("views",{noCache:true})


app.use('/', tomiroutes)

User.sync({force:true})
.then(function(){
	return Pet.sync()
})
.then(function(){
	app.listen(3000, function(){console.log("server listening on port 3000")})
})
.catch(function(err){console.log(err)})