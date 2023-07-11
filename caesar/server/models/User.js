const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// import schema from Restaurant.js
const RestaurantSchema = require('./Restaurant');
const VenueSchema = require('./Entertainment');
const AdventureSchema = require('./Adventure');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedRestaurants to be an array of data that adheres to the restaurantSchema
        savedRestaurants: [RestaurantSchema],
    // set savedVenue to be an array of data that adheres to the venueSchema
        savedVenues: [VenueSchema],
    // set savedAdventures to be an array of data that adheres to the adventureSchema
        savedAdventures: [AdventureSchema]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `restaurantCount` with the number of saved restaurants we have
userSchema.virtual('restaurantCount').get(function () {
  return this.savedRestaurants.length;
});

// when we query a user, we'll also get another field called `venueCount` with the number of saved entertainment venues we have
userSchema.virtual('venueCount').get(function () {
    return this.savedVenues.length;
});
  
// when we query a user, we'll also get another field called `venueCount` with the number of saved entertainment venues we have
userSchema.virtual('adventureCount').get(function () {
  return this.savedAdventures.length;
});

const User = model('User', userSchema);

module.exports = User;