const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var multer = require('multer');
var upload = multer();
const $ = require('jquery');

const hbs = require('hbs');
const fs = require('fs');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

var {mongoose} = require('./db/mongoose');
var {Event} = require('./models/event');
var {Team} = require('./models/team');

const port = process.env.PORT || 3000;
var app = express();
// console.log(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(upload.array());

hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
// 	var now = new Date().toString();
// 	var log = `${now}: ${req.method} ${req.url}`;
//
// 	console.log(log);
// 	fs.appendFile('server.log', log + '\n', (err) => {
// 		if (err) {
// 			console.log('Unable to append to server.log.');
// 		}
// 	});
// 	next();
// });

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
		console.log(teams);
		res.render('list.hbs', {teamList : teams});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/update', (req, res) => {
	res.send('/update');
});

app.get('/remove', (req, res) => {
	res.send('/remove');
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
	console.log(req.body);
	var players = [];
	var playerObj = {};
	for (let i = 1; i < 21; i++) {
		var playerObj = { playerName: req.body[`player${i}Name`], playerNumber: req.body[`player${i}Number`], playerPosition: req.body[`player${i}Position`] };
		if (req.body["player" + i + "Name"] === '') {
			console.log("Empty player name detected, disregarding");
		} else {
			console.log(i);
			console.log("This is number " + i + " " + playerObj);
			players.push(playerObj);
		}
	}
	console.log("This is the players array: " + players);

	var newTeam = new Team({
		// POSTMAN SETUP BELOW
		// "team": req.body.team[0],
		// "teamName": req.body.team[0].teamName,
		// "shortTeamName": req.body.team[0].shortTeamName,
		// "teamRoster": req.body.team[0].teamRoster,
		// "teamCoach": req.body.team[0].teamCoach

		// WEB SETUP BELOW
		"team.teamRoster.teamCoach": req.body.coachName,
		"team.shortTeamName": req.body.teamShortName,
		"team.teamName": req.body.teamName,
		"team.teamRoster.players": players
	});

	console.log(req.params);

	newTeam.save().then((doc) => {
		var teamId = doc.id;
		console.log(teamId);
		res.render('success.hbs', {id : teamId});
		console.log("Team Added");
	}, (e) => {
		res.status(400).send(e);
	});
});

// Delete ROUTES
app.delete('/events/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Event.findByIdAndRemove(id).then((event) => {
    if(!event) {
      return res.status(404).send();
    }

    res.send({event});
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
