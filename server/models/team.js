var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;

var player = new Schema({
      player:  {
        playerName: {
          type: String,
          trim: true,
          required: true
        },
        playerNumber: {
          type: Number,
          minlength: 1,
          maxlength: 2
          }
        },
        playerPosition: {
          type: String
      }
});

var Team = mongoose.model('Team', {
  data: {
    entry: {
      type: String,
      default: "StatCaster2019.USER.INPUT"
    },
    added: Date.Now,
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
        },
        players: [ player ],
      }
    ]

      // teamName: {
      // 	type: String,
      // 	trim: true,
      // 	required: true
    	// },
    	// shortTeamName: {
      // 	type: String,
   	  //  	trim: true,
 	    //  	uppercase: true,
	    //   maxlength: 3,
	    //   required: true
	    // },
	    // teamRoster: {
	    //   players: [ player ],
	    //   teamCoach: {
	    //     type: String,
	    //     trim: true,
	    //     required: true
	    // 	},
	 	 	// },
   	  // added: {
      // 	type: Date,
      // 	default: Date.now
    	// },
    	// updated: {
      // 	type: Date,
      // 	default: Date.now
    	// },
      // teamLogo: result.url,
      // // teamLogo_id: result.public_id,
      // type: Mixed
  	}
});

module.exports = {Team};
