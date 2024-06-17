const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PGMZUIxZAKhTyZwFrl73oW4ZT4tKbJ5s1uFca4Kec9RBx2Ktk1w79OmFg0cRrHJ2Bhvzp15fLwIYRjF6OvrOn5n00PBRygPc6');
const prisma = require("../database");

router.post('/pay', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card']
        });

        await prisma.payment.create({
            data: {
                amount,
                currency,
                status: paymentIntent.status
            }
        });

        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error making payment' });
    }
});


router.post('/pay/:id', async (req, res) => {
    const paymentId = parseInt(req.params.id); 

    try {
        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId
            }
        });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json({ status: payment.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error verifying payment' });
    }
});

module.exports = router;
