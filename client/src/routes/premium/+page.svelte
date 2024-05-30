<script>
    import { loadScript } from "@paypal/paypal-js";
    import Navbar from "../../components/Navbar.svelte";

    loadScript({ clientId: "AfX-zOInf8eBApIo6VMlPfe03f9kuEIas-2s6BYNHZ0dwRDD3_fbYy324y-CUnCofI1kOKmhwZjHsviz", vault: true })
    loadScript({ clientId: "ATihCMbdF6svmNfAwrJitzRiAGdq6drzwE5_xlfpY1-BL2x0fY9YKuIEiB8TpfpZ8ivezqX_CI3yEl_K", vault: true })
    .then((paypal) => {

        if (!paypal) return;
        if (typeof paypal.Buttons !== 'function') return; // Add this check

        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'black',
                layout: 'vertical',
                label: 'subscribe'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                /* Creates the subscription */
                plan_id: 'P-4JE04914X5103712DMZJXMCA'
                });
            },
            async onApprove(data, actions) {
                console.log(data, actions);
                alert(data.subscriptionID); // You can add optional success message for the subscriber here
            }
        }).render('#paypal-button-container-P-4JE04914X5103712DMZJXMCA'); // Renders the PayPal button

    })
    .catch((err) => {
        console.error("failed to load the PayPal JS SDK script", err);
    });
</script>


<Navbar/>
<h1>BUCKSHOT PREMIUM</h1>
<div id="paypal-button-container-P-4JE04914X5103712DMZJXMCA"></div>

<style>

    #paypal-button-container-P-4JE04914X5103712DMZJXMCA {
        max-width:10rem;
    }

</style>