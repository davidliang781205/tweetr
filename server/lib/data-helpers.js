"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `MongoDB`
    saveTweet: function(newTweet, callback) {
      db.collection("tweeter").insert(newTweet);
      callback(null, true);
    },
    // Get all tweets in `MongoDB`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweeter").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }
  };
}