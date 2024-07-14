<script>

</script>

<div class="companies">
    <div class="section-title">
        <h2>Trusted by</h2>
    </div>
    <div class="companies-inner">
        <img src="/images/company logos/google.svg" alt="logo"/>
        <img src="/images/company logos/indeed.svg" alt="logo"/>
        <img src="/images/company logos/linkedin.svg" alt="logo"/>
        <img src="/images/company logos/canva.svg" alt="logo"/>
        <img src="/images/company logos/amazon.svg" alt="logo"/>
        <img src="/images/company logos/apple.svg" alt="logo"/>
        <img src="/images/company logos/microsoft.svg" alt="logo"/>
        <img src="/images/company logos/reddit.svg" alt="logo"/>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .companies-inner {
        margin:0 auto;
        padding:1rem;
        width:fit-content;
        @include flex-center-row;
        margin-bottom:4rem;
        gap:7rem;
        img {
            width:3rem;
            filter: grayscale(100%) brightness(0.8);
            opacity:0.8;
        }
    }

</style>