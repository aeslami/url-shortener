const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const connection = mongoose.createConnection(process.env.MongoDBURL);

autoIncrement.initialize(connection);

const urlSchema = new Schema({
  fullURL: String
});

urlSchema.plugin(autoIncrement.plugin, 'Urls');
const Url = connection.model('Urls', urlSchema);

module.exports = Url;
