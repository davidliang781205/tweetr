"use strict";

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `MongoDB`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweeter").push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `MongoDB`, sorted by newest first
    getTweets: function(callback){

                db.collection("tweeter").find().toArray((err, tweets) => {
                  if (err) {
                    return callback(err);
                  }
                  console.log(tweets);
                  callback(null, tweets);
                });
    }
  };
}
