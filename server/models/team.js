var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;

var player = new Schema({
      playerName: {
        type: String,
        trim: true,
        required: true
      },
      playerNumber: {
        type: Number,
        minlength: 1,
        maxlength: 2
      },
      playerPosition: {
        type: String
      },
      playerNationality: {
        type: String
      }
});

var Team = mongoose.model('Team', {
  data: {
    entry: {
      type: String,
      default: "StatCaster.USER.INPUT"
    },
    added: {
      type: Date,
      default: Date.Now
    },
    updated: {
      type: Date,
      default: Date.Now
    },
    teamDetails: [
      {
        teamName: {
          type: String,
          trim: true,
          default: "First Team"
        },
        teamNameShort: {
          type: String,
          trim: true,
          uppercase: true,
          maxlength: 3,
          default: "XXX"
        },
        teamFounded: {
          type: Number,
          maxlength: 4,
          default: 2000
        },
        teamHomeCity: {
          type: String,
          trim: true,
          default: "City"
        },
        players: [ player ],

        coachingStaff: {
          headCoach: {
            type: String,
            trim: true
          },
          teamManager: {
            type: String,
            trim: true
          },
          type: Mixed,
        }
        },

      ]
      // teamLogo: result.url,
      // // teamLogo_id: result.public_id
  	}
});

module.exports = {Team};
