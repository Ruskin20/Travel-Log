const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedRestaurants` array in User.js
const restaurantSchema = new Schema({
  restaurant_name: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = restaurantSchema;