const { addCredits, makePremium, removePremium, getUser } = require("../../datamodels/user");
const { sendPaymentFailedEmail } = require("../../lib/sendEmail");

// // test
// const productIds = {
//     tier1: "prod_QUkT5Tt24SKIpb",
//     tier2: "prod_QUkU6AGWvPjxAr",
//     tier3: "prod_QUkUDI4WxLLgZt"
// }

// live 
const productIds = {
    tier1: "prod_QSvt1OsaubQ5a9",
    tier2: "prod_QUjuJwd3D5HMTq",
    tier3: "prod_QUjvwWj1SLpVZQ"
}

async function handleWebhook(request, response, stripe, stripeLogin) {

    const sig = request.headers['stripe-signature'];

    let event;
  
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, stripeLogin.webhookSecret);
    } catch (err) {
        console.log(err);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
  
    let subscription;
    let session = event.data.object;
    let user;
  
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.

            user = session.metadata.client_reference_id;
            if(!user) return;

            // Check if this is a one-time payment or a subscription
            if (session.mode === 'payment') {
                // This is a one-time payment
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

                for(let i = 0; i < lineItems.data.length; i++) {
                    let addAmount = 0;
                    let item = lineItems.data[i];
                    switch(item.price.product) {
                        case productIds.tier1:
                            addAmount = 15;
                            break;
                        case productIds.tier2:
                            addAmount = 50;
                            break;
                        case productIds.tier3:
                            addAmount = 150;
                            break;
                        default:
                            break;
                    }
                    await addCredits(user, addAmount);
                }

            } else if (session.mode === 'subscription') {

                await stripe.subscriptions.update(session.subscription,{
                    metadata: {
                        client_reference_id: user
                    }
                });
                await makePremium(user);
            }

            break;

        case 'invoice.paid':
            subscription = await stripe.subscriptions.retrieve(session.subscription);
            user = subscription.metadata.client_reference_id;
            if(user) {
                await addCredits(user, 15);
            } 
            break;
        
        case 'invoice.payment_failed':
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
    
            subscription = await stripe.subscriptions.retrieve(session.subscription);
            user = subscription.metadata.client_reference_id;
            await removePremium(user);

            const userData = await getUser(user);
            await sendPaymentFailedEmail(userData.email);

            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();

}

module.exports = handleWebhook;