//db schema design
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare collection and vairable and its type

let Product = new Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  description: {
    type: String
  }

},
  {
    collection: 'products'
  }
);

module.exports = mongoose.model('pro', Product);