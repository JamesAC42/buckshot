<script>
    import Navbar from "./Navbar.svelte";
    import Footer from "./landing sections/Footer.svelte";
    export let title = "";
    export let message = "";
</script>

<Navbar/>

<div class="payment-landing-outer">
    
    <div class="payment-landing-inner">
        <div class="payment-landing-container">
            <div class="logo">
                <img src="/images/logo.png" alt="logo"/>
            </div>
            <div class="payment-message">
                <h3>{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    </div>
    <Footer />

</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    
    .payment-landing-outer {
        position:relative;
        padding:0;
        overflow-x:hidden;
        height:calc(100vh - 5rem);
        display:flex;
        flex-direction: column;
        gap:0;
        overflow-y:scroll;
        scrollbar-width: thin;
        
        .payment-landing-inner {
            @include flex-center-row;
            height:50rem;
            align-items:center;
            .payment-landing-container {
                @include flex-center-row;
                height:fit-content;
                border-radius:1rem;
                overflow:hidden;
                border:1px solid $primary-color;
                margin:0 2rem;
                .logo {
                    width:fit-content;
                    background:$background;
                    img {
                        width:10rem;
                        transform:translateY(5px);
                    }
                }
                .payment-message {
                    padding:2rem;
                }
            }
        }
    }

</style>