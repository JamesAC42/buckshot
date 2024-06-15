<script>
    import { loadScript } from "@paypal/paypal-js";
    import Navbar from "../../components/Navbar.svelte";
  import PaymentOptions from "../../components/PaymentOptions.svelte";

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


    let showPayment = false;
    function togglePayment() {
        showPayment = !showPayment;
    }

</script>


<Navbar/>

<div class="payment-options-container">
    <h1>Upgrade to Premium</h1>
    <p>Exclusive features including more language models, cover letters, and free credits. Or just buy credits to make as many resumes as you need.</p>
    <br>
    <PaymentOptions />
</div>

{#if showPayment}
<div class="paypal-container-background">
</div>
<div class="paypal-container">
    <div class="paypal-container-inner">
        <div class="paypal-container-close">Close</div>
        <div class="paypal-container-shadow"></div>
        <div class="paypal-container-content">
            <div id="paypal-button-container-P-4JE04914X5103712DMZJXMCA"></div>
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .payment-options-container {
        h1 {
            @include pop-in-transition;
            text-align:center;
        }
        p {
            @include pop-in-transition;
            text-align:center;
            font-size:1.3rem;
        }
        @include center-fixed;
    }

    #paypal-button-container-P-4JE04914X5103712DMZJXMCA {
        max-width:10rem;
    }

</style>