<script>
    import Navbar from "../../components/Navbar.svelte";
    import PaymentOptions from "../../components/PaymentOptions.svelte";

</script>


<Navbar/>

<div class="payment-options-container">
    <h1>Upgrade to Premium</h1>
    <p>Exclusive features including cover letter generation, additional language models, community access, and free monthly credits. Or buy credits to make as many resumes as you need.</p>
    <br>
    <PaymentOptions />
</div>

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

</style>