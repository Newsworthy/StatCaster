var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var Team = mongoose.model('Team', {
  team: [
    {
    teamName: {
      type: String,
      trim: true,
      required: true
    },
    shortTeamName: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 3,
      required: true
    },
    teamCoach: {
      type: String,
      trim: true,
      required: true
    },
    teamRoster: [
      {
        playerName: {
          type: String,
          trim: true,
          default: "Firstname Lastname"
        },
        playerNumber: {
          type: Number,
          minlength: 1,
          maxlength: 2
        }
      }
    ],
    added: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  }
  ]


    });
//
// var Event = mongoose.model('Event', {
//   client: {
//     name: {
//       type: String,
//       minlength: 1,
//       trim: true
//     },
//     event: {
//       title: {
//         type: String,
//         minlength: 1,
//         trim: true,
//         required: true
//       },
//       date: Date,
//       speakers: [speakerList],
//     },
//     added: {
//         type: Date,
//         default: Date.now
//       },
//     updated: {
//       type: Date,
//       default: Date.now
//     },
//     }
// });
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

module.exports = {Team};
