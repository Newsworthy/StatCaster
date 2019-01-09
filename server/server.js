const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const hbs = require('hbs');
const fs = require('fs');

var {mongoose} = require('./db/mongoose');
var {Event} = require('./models/event');

const port = process.env.PORT || 3000;
var app = express();
// console.log(__dirname);

app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/../views/partials')
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
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.get('/events', (req, res) => {
  Event.find().then((events) => {
    res.send({events});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/events/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Event.findById(id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }

    res.send({event});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST ROUTES

app.post('/add', (req, res) => {
	console.log("Post command received");
	var event = new Event({
		"client.name": req.body.client.name,
		"client.event.title": req.body.event.title,
		"client.event.speakers":  req.body.event.speakers
	});
	event.save().then((doc) => {
			console.log(doc);
			res.send(doc);
			console.log("Event sent");
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
