const mongoose = require('mongoose');
 
const TokenSchema = new mongoose.Schema({
    Name: String,
    Value: Decimal128
});
 
module.exports = mongoose.model(
    'Tokens', TokenSchema, 'Tokens');
