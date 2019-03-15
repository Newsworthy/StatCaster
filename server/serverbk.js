var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;

var Team = mongoose.model('Team', {
  data: {
    entry: {
      type: String,
      default: "StatCaster2019.USER.INPUT"
    },
    added: {
      type: Date,
      default: Date.Now
    },
    teamDetails: [
      {
        teamName: {
          type: String,
          trim: true,
          required: true,
          default: "First Team"
        },
        teamNameShort: {
          type: String,
          trim: true,
          uppercase: true,
          maxlength: 3,
          required: true
        },
        teamFounded: {
          type: Number,
          maxlength: 4
        },
        teamHomeCity: {
          type: String
        }
      }
    ]
  }
});

module.exports = {Team};
