const express = require('express')
const router = express.Router()
const User = require("../models").User
const Pet = require("../models").Pet


router.get('/', function(req,res,next){
	res.render("../views")
})

router.post('/', function(req,res,next){
	User.create({
		name: req.body.theName,
		age: req.body.theAge,
		sex: req.body.theSex
	})
	.then(function(user){
		return Pet.create({
			name: req.body.petName,
			type: req.body.petType
		})
		.then(function(pet){
			pet.setUser(user)
		})
	})
	.then(function(){
		res.render("../views/index2.html", {
			name2: req.body.theName,
			age2: req.body.theAge,
			sex2: req.body.theSex,
			petname2: req.body.petName,
			pettype2: req.body.petType
		})
	})
	.catch(function(err){console.log(err)})
})

router.get('/:userName', function(req,res,next){
	User.findOne({where:
		{name: req.params.userName}
	})
	.then(function(user){
		return user.getPets()
	})
	.then(function(pets){
	res.render("../views/index3.html", {
		user: req.params.userName,
		pets : pets
	 })
	})
})


module.exports = router; 