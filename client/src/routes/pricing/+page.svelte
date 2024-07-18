<script>
    import Footer from "../../components/landing sections/Footer.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import CreditOptions from "../../components/pricing/CreditOptions.svelte";
    import PremiumOptions from "../../components/pricing/PremiumOptions.svelte";

</script>


<Navbar/>

<div class="container payment-options-container">

    <div class="pricing-options">
        <h1>Upgrade to Premium</h1>
        <p>Exclusive features including cover letter generation, unlimited tabs, early access to new language models, and free monthly credits.</p>
        <br>
        <PremiumOptions />
    </div>
    
    <div class="pricing-options">
        <h1>Credits</h1>
        <p>Need more resumes? Purchase as many credits as you need. Credits are only used to generate resumes or cover letters. They are not required to download or edit an existing generation.</p>
        <br>
        <CreditOptions />
    </div>

    <Footer />

</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .payment-options-container {
        padding:5rem 0 0 0;
        overflow-x:hidden;
        height:calc(100vh - 5rem - 5rem);
        display:flex;
        flex-direction: column;
        gap:3rem;
        overflow-y:scroll;
        scrollbar-width: thin;
    }

    .pricing-options {
        padding:0 5rem;
        h1 {
            @include pop-in-transition;
            text-align:center;
        }
        p {
            @include pop-in-transition;
            padding:0 10rem;
            text-align:center;
            font-size:1.3rem;
        }
    }

</style>