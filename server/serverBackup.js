const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var multer = require('multer');
var upload = multer();
const $ = require('jquery');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const hbs = require('hbs');
const fs = require('fs');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

var {mongoose} = require('./db/mongoose');
var {Event} = require('./models/event');
var {Team} = require('./models/team');
// var secrets = require('./config/secrets');

const port = process.env.PORT || 3000;
var app = express();
// console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(upload.array());

hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

app.use(express.static(__dirname + '/../public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

// hbs.registerHelper('teamId', (context, options) => {
// 	return options.fn(doc.id);
// });

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.get('/create', (req, res) => {
	res.render('create.hbs');
});

app.get('/list', (req, res) => {
	Team.find().then((teams) => {
		res.render('list.hbs', {teamList : teams});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/update/team/:id', (req, res) => {
	var id = req.params.id;
	console.log(id);
	if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
	Team.findById(id).then((team) => {
		if (!team) {
			return res.render('error.hbs');
		}
		console.log(team);
		console.log(team.team.teamRoster.players[0])
		res.render('update.hbs', {team});
	}).catch((e) => {
		res.render('error.hbs');
	});
});

app.get('/team/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Team.findById(id).then((team) => {
    if (!team) {
      return res.status(404).send();
    }
    res.send({team});
  }).catch((e) => {
    res.status(400).send();
	});
});
// POST ROUTES
app.post('/create', (req, res) => {
	console.log('Post command received');
	// We need to push the players names and other information into an array
	// var players = [];
	// var playerObj = {};
	// for (let i = 1; i < 21; i++) {
	// 	var playerObj = { playerName: req.body[`player${i}Name`], playerNumber: req.body[`player${i}Number`], playerPosition: req.body[`player${i}Position`] };
	// 	if (req.body["player" + i + "Name"] === '') {
	// 		console.log("Empty player name detected, disregarding");
	// 	} else {
	// 		players.push(playerObj);
	// 	}
	// }
	//We need to push the variable below, 'teamDetails', as an object into an array of the same name
	var playersArr = req.body.data.teamDetails[0].players;

	var teamDetailsObj = {
	// Modified for Postman
	"teamName": req.body.data.teamDetails[0].teamName,
	"teamNameShort": req.body.data.teamDetails[0].teamNameShort,
	"teamFounded": req.body.data.teamDetails[0].teamFounded,
	"teamHomeCity": req.body.data.teamDetails[0].teamHomeCity,
	"coachingStaff.headCoach": req.body.data.teamDetails[0].coachingStaff.headCoach,
	"coachingStaff.teamManager": req.body.data.teamDetails[0].coachingStaff.teamManager,
	"players": playersArr
	// Setup for Web Entry
	};
	var teamDetailsArr = [];
	teamDetailsArr.push(teamDetailsObj);
	var newTeam = new Team({
		// POSTMAN SETUP WORKING
		"data.updated": new Date(),
		"data.added": new Date(),
		"data.entry": req.body.data.entry,
		// WEB ENTRY SETUP

	});

	newTeam.data.teamDetails.push(teamDetailsArr[0]);
	newTeam.save().then((doc) => {
		console.log("This is newTeam.data: " + newTeam.data);
		var teamId = doc.id;
		res.render('success.hbs', {teamId});
		console.log("Team Added - " + teamId);
	}, (e) => {
		res.status(400).send(e);
	});
});

// Delete ROUTES
app.post('/remove/team/:id', (req, res) => {
	console.log("Delete command received. " + req.params.id)
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Team.findOneAndDelete(id).then((team) => {
    if(!team) {
      return res.status(404).send();
    }
    res.render("deleteSuccess.hbs");
  }).catch((e) => {
    res.status(400).send();
  });
});


// app.post('/create', (req, res) => {
// 	// console.log("Post command received");
// 	// console.log("This is the category: " + req.body.category);
// 	// console.log("This is the title: " + req.body.product.title);
// 	// console.log("This is the quantity: " + req.body.product.quantity);
// 	// console.log("This is the description: " + req.body.product.description);
//
// 	var item = new Item({
//
//
// 		// category: req.body.category,
// 		// "product.title": req.body.product.title,
// 		// quantity: req.body.product.quantity,
// 		// "product.description": req.body.product.description
// 	});
// 	// console.log(item);
//
// 	item.save().then((doc) => {
// 		// console.log(doc);
// 		res.send(doc);
// 		console.log("Product sent");
// 	}, (e) => {
// 		res.status(400).send(e);
// 	});
// });


// Getting Blog post by ID soon

// // app.get('/blog/:id', (req, res) => {
//
// })

app.all('*', function(req, res) {
  res.render("error.hbs");
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
