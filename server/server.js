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
console.log(__dirname);

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

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.get('/create', (req, res) => {
	res.render('create.hbs');
});

app.get('/list', (req, res) => {
	res.send('/list');
});

app.get('/update', (req, res) => {
	res.send('/update');
});

app.get('/remove', (req, res) => {
	res.send('/remove');
});

// app.get('/events', (req, res) => {
//   Event.find().then((events) => {
//     res.send({events});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

// app.get('/events/:id', (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   Event.findById(id).then((event) => {
//     if (!event) {
//       return res.status(404).send();
//     }
//
//     res.send({event});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });

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
	console.log(req.body.teamName);
	console.log(req.body.teamShortName);
	// console.log(req.body.player1Name);
	// console.log(req.body.player1Number);
	// console.log(req.body.team[0].teamName)
	var newTeam = new Team({
		"team": req.body,
		"teamName": req.body.teamName,
		"shortTeamName": req.body.shortTeamName,
		// "teamRoster": req.body.teamRoster,
		"teamCoach": req.body.teamCoach
	});
	newTeam.save().then((doc) => {
		console.log(doc);
		res.send(doc);
		console.log("Team Added");
	}, (e) => {
		res.status(400).send(e);
	});
});

// app.post('/add', (req, res) => {
// 	console.log("Post command received");
// 	var event = new Event({
// 		"client.name": req.body.client.name,
// 		"client.event.title": req.body.client.event.title,
// 		"client.event.speakers":  req.body.client.event.speakers
// 	});
// 	event.save().then((doc) => {
// 			console.log(doc);
// 			res.send(doc);
// 			console.log("Event sent");
// 		}, (e) => {
// 			res.status(400).send(e);
// 		});
// });

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
