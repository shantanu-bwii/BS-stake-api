const mongoose = require('mongoose');
 
const TokenSchema = new mongoose.Schema({
    Name: String,
    Value: Number
});
 
module.exports = mongoose.model(
    'Tokens', TokenSchema, 'Tokens');