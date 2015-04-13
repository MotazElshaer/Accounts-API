var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
	Email: String, 
	Password: String, 
	Status: Boolean, 
	Type: Boolean
});

module.exports = mongoose.model('Account', AccountSchema);