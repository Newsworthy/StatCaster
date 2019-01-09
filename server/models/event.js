var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var speakerList = new Schema({
  name: {
    type: String,
    trim: true,
    default: "FirstName LastName"
  },
  title: {
    type: String,
    trim: true,
    default: "Position or title"
  }
});

var Event = mongoose.model('Event', {
  client: {
    name: {
      type: String,
      minlength: 1,
      trim: true
    },
    event: {
      title: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
      },
      date: Date,
      speakers: [speakerList],
    },
    added: {
        type: Date,
        default: Date.now
      },
    updated: {
      type: Date,
      default: Date.now
    },
    }
});
//   category: {
//     type: String,
//     minlength: 1,
//     trim: true,
//     required: true,
//   },
//   product: {
//     title: {
//       type: String,
//       minlength: 1,
//       trim: true,
//       required: true
//     },
//     quantity: {
//       type: Number,
//       default: 1,
//       required: true
//     },
//     added: {
//       type: Date,
//       default: Date.now
//     },
//     description: {
//       type: String,
//       minlength: 1,
//       trim: true,
//       required: true
//     }
//   }
// });

module.exports = {Event};
