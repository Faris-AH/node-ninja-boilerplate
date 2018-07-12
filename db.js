const mongoose = require('mongoose');

const db = {
  init: function () {
    /**
     * Connect to MongoDB.
     */
    mongoose.connect(process.env.MONGODB_URI)
      .then(connection => {
        console.log('Connected to MongoDB')
      })
      .catch(error => {
        console.log(error.message)
      })
  }

}

module.exports = db;

