const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Matt:Standish@cluster0.ddj5u67.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
