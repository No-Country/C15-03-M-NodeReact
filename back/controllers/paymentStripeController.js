const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require('../middleware/catchAsyncError')
// Process Stripe Payments => /api/v1/payment/process
const processPaymet = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Api Key Stripe => /api/v1/stripeapi
const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    // stripeApiKey: process.env.STRIPE_API_KEY,
    nada:"no retorna nada"
  });
});

module.exports = {
    sendStripeApiKey,
    processPaymet
}