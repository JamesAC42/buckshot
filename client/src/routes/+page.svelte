<svelte:head>
    <title>buckshot</title> 
</svelte:head>

<script>

    import Navbar from "../components/Navbar.svelte";
    import Features from "../components/landing sections/Features.svelte";
    import HowItWorks from "../components/landing sections/HowItWorks.svelte";
    import Testimonials from "../components/landing sections/Testimonials.svelte";
    import Footer from "../components/landing sections/Footer.svelte";
    import Cta from "../components/landing sections/CTA.svelte";
    import Screenshot from "../components/landing sections/Screenshot.svelte";
    import Banner from "../components/landing sections/Banner.svelte";
    import Companies from "../components/landing sections/Companies.svelte";
  import Faq from "../components/landing sections/FAQ.svelte";
    
</script>

<Navbar/>

<div class="container home-container">

    <Banner />
    <Screenshot />

    <HowItWorks />
    <Features />
    <Faq />

    <div class="cta-outer">
        <Cta float={true}/>
    </div>

    <Footer />

</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    .home-container {
        padding:0;
        overflow-x:hidden;
        height:calc(100dvh - 5rem);
        display:flex;
        flex-direction: column;
        gap:0;
        overflow-y:scroll;
        scrollbar-width: thin;
    }

    .cta-outer {
        padding:0 2rem;
    }

</style>