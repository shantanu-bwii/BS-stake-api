const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StakingModel = require('./stakingSchema.js');
const TokenModel = require('./tokenSchema.js');

// Connecting to database
const password = 'udit@123#'
const query = `mongodb+srv://uditchandan1988:${encodeURIComponent(password)}@cluster0.3re3ekx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(query, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  }
);

// Stake - Routes
router.post('/stake', async (req, res) => {
    try {
      const newStake = new StakingModel();
      newStake.StakingId = req.body.StakingId;
      newStake.UserAddress = req.body.UserAddress;
      newStake.Token = req.body.Token;
      newStake.InvestedAmount = req.body.InvestedAmount;
      newStake.CalculatedRewards = req.body.CalculatedRewards;
      newStake.Plan = req.body.Plan;
      newStake.IsActive = req.body.IsActive;
      newStake.ExpiresOn = req.body.ExpiresOn;
  
      const savedStake = await newStake.save();
      res.send("Staking Done");
    } catch (error) {
      console.error('Error saving staking:', error);
      res.status(500).send("Error occurred");
    }
});

router.get('/getStakes', async (req, res) => {
    try {
      const data = await StakingModel.find().exec();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

router.get('/getActiveStakes', async (req, res) => {
    try {
      const data = await StakingModel.find({IsActive: 0}).exec();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

router.get('/getTotalRewards', async (req, res) => {
    try {
      const result = await StakingModel.aggregate([
        {
          $match: { IsActive: 0 }
        },
        {
          $group: {
            _id: null,
            totalRewards: { $sum: "$CalculatedRewards" }
          }
        }
      ]).exec();
      console.log(result);

      const totalRewards = result.length > 0 ? result[0].totalRewards : 0;
      res.send({ totalRewards });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});


// Token Routes

router.post('/addToken', async (req, res) => {
    try {
        const newAddToken = new TokenModel();
        newAddToken.Name = req.body.Name;
        newAddToken.Value = req.body.Value;
        const savedAmount = newAddToken.save();
        res.send("Token Added Successfully");
    } catch (error) {
        console.error('Error saving staking:', error);
        res.status(500).send("Error occurred");
    }
})

router.get('/getTokens', async (req, res) => {
    try {
      const data = await TokenModel.find().exec();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

router.put('/add-amount', async (req, res) => {
    try {
      const { Name, Value } = req.body;
  
      // Find the token by name
      const token = await TokenModel.findOne({ Name: Name });
  
      if (!token) {
        return res.status(404).json({ message: 'Token not found' });
      }
  
      // Add the value to the existing value of the token
      token.Value += parseInt(Value);
  
      // Save the updated token
      await token.save();
  
      return res.json(token);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;