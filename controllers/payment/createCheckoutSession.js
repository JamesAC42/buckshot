const createCheckoutSession = async (req, res, stripe) => {

    const {priceId, mode} = req.body;
    if(!priceId || !mode) {
        return res.status(400).send({ success: false, message: "Provide a price ID and mode." }); 
    }

    let user = req.session.user;
    if(!user) {
        return res.status(400).send({ success: false, message: "Invalid session." });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode,
            line_items: [
                {
                    price: priceId,
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            client_reference_id: user,
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: 'https://buckshot.me/paymentSuccess',
            cancel_url: 'https://buckshot.me/paymentCanceled',
            automatic_tax: {enabled: true},
            metadata: {
                client_reference_id: user
            }
        });
        res.json({success: true, url: session.url});
    } catch(err) {
        console.error(err);
        res.status(400).json({success: false});
    }


}

module.exports = createCheckoutSession;