const mongoose = require('mongoose');
 
const StakingSchema = new mongoose.Schema({
    StakingId: String,
    UserAddress: String,
    Token: String,
    InvestedAmount: Number,
    CalculatedRewards: Number,
    Plan: Number,
    IsActive: Number,
    ExpiresOn: Date,
    StartedOn: Date
}, { timestamps: true }
);
 
module.exports = mongoose.model(
    'Staking', StakingSchema, 'Stakings');