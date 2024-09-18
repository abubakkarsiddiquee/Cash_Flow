const axios = require('axios');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Stripe payment route
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// bKash payment route
app.post('/bkash-payment', async (req, res) => {
  const { amount, phone } = req.body;
  try {
    // Call bKash API for payment
    const bkashResponse = await axios.post('https://api.bkash.com/v1/checkout/payment', {
      amount,
      phone,
      // Add required bKash API credentials here
    });
    res.send(bkashResponse.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Nagad payment route
app.post('/nagad-payment', async (req, res) => {
  const { amount, phone } = req.body;
  try {
    // Call Nagad API for payment
    const nagadResponse = await axios.post('https://api.nagad.com/v1/checkout/payment', {
      amount,
      phone,
      // Add required Nagad API credentials here
    });
    res.send(nagadResponse.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
