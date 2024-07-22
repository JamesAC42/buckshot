
<script>

    import TestimonialItem from "../TestimonialItem.svelte";

</script>

<div class="testimonials">
    <div class="section-title">
        <h2>Testimonials</h2>
    </div>

    <div class="testimonials-inner">

    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";


    .testimonials {
        
        margin-bottom:4rem;

        .testimonials-inner {
            width:70dvw;
            margin:0 auto;
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

    }


</style>