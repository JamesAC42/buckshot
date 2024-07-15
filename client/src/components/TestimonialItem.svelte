<script>
 
    import Section from "./Section.svelte";

    import QuoteOpen from "~icons/bxs/quote-left";
    import QuoteClose from "~icons/bxs/quote-right";

    export let comment = "";
    export let author = "";

    export let interact = false;
    export let background = true;
    

</script>

<div class="testimonial-item-outer" class:interact={interact}>
    <Section background={background}>
        <div class="testimonial-item">
            <div class="quote-img-open">
                <QuoteOpen />
            </div>
            <div class="quote-img-close">
                <QuoteClose />
            </div>
            <div class="testimonial-comment">
                {comment}
            </div>
            <div class="testimonial-author">
                - {author}
            </div>
        </div>
    </Section>
</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    .testimonial-item-outer {
        @mixin pop-in-transition {
            animation:pop-in .2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1;
        }
        height:fit-content;

        &.interact {
            transition:transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &:hover {
                transform:scale(1.3) rotate(-4deg);
                z-index:9000;
            }
        }
    }

    .testimonial-item {
        position:relative;
        padding: 1rem;
        background-color: #fff;
        @include flex-center-col;
        height:fit-content;

        margin:0 auto;

        .testimonial-comment {
            padding-bottom:1rem;
            min-width:10rem;
            max-width:20rem;
            word-wrap:break-word;
            z-index:1000;
            flex:1;
        }
        .testimonial-author {
            border-top:1px solid #000;
            padding-top:1rem;
            font-size:1.2rem;
            font-weight:600;
            z-index:1000;
            margin-top:auto;
        }

        .quote-img-open,
        .quote-img-close {
            position:absolute;
            z-index:999;
            margin:1rem;
            opacity:0.08;
            filter:brightness(1.5);
        }
        .quote-img-open {
            top:0;left:0;
            transform:scale(4) translate(10px, 10px) rotate(-10deg);
        }
        .quote-img-close {
            bottom:0;right:0;
            transform:scale(4) translate(-10px, -2px) rotate(7deg);
        }
    }

</style>