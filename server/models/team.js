var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;

var player = new Schema({
      player:  {
        playerName: {
          type: String,
          trim: true,
          required: true,
          index: {
            sparse: true
          }
        },
        playerNumber: {
          type: Number,
          minlength: 1,
          maxlength: 2,
          index: {
            sparse: true
          }
        },
        playerPosition: {
          type: String,
          index: {
            sparse: true
        }
      }
    }
});

var Team = mongoose.model('Team', {
  team: {
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
	    teamRoster: {
	      players: [ player ],
	      teamCoach: {
	        type: String,
	        trim: true,
	        required: true
	    	},
	 	 	},
   	  added: {
      	type: Date,
      	default: Date.now
    	},
    	updated: {
      	type: Date,
      	default: Date.now
    	},
      type: Mixed
  	}
});

module.exports = {Team};
