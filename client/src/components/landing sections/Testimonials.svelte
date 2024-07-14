
<script>
    import Section from "../Section.svelte";

    import QuoteOpen from "~icons/bxs/quote-left";
    import QuoteClose from "~icons/bxs/quote-right";
</script>

<div class="testimonials">
    <div class="section-title">
        <h2>Testimonials</h2>
    </div>

    <div class="testimonials-inner">

        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "Buckshot saved me hours of frustration. I applied to 5 different jobs in one afternoon, each with a tailored resume."
                    </div>
                    <div class="testimonial-author">
                        Sarah K.
                    </div>
                </div>
            </Section>
        </div>
        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "As a recent graduate, I was struggling to create a professional resume. Buckshot's guidance and templates helped me showcase my skills effectively."
                    </div>
                    <div class="testimonial-author">
                        Michael T.
                    </div>
                </div>
            </Section>
        </div>
        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "The ability to manage multiple job applications in one place is a game-changer. Buckshot's organized approach helped me keep track of different versions of my resume and application statuses effortlessly."
                    </div>
                    <div class="testimonial-author">
                        Rachel L.
                    </div>
                </div>
            </Section>
        </div>
        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "As a career changer, I was worried about how to present my skills. Buckshot helped me create both a resume and cover letter that effectively highlighted my transferable skills. The customization options allowed me to fine-tune everything to my liking. I'm thrilled with the results!"
                    </div>
                    <div class="testimonial-author">
                        Marcus P
                    </div>
                </div>
            </Section>
        </div>
        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "I was skeptical about AI-generated resumes, but Buckshot impressed me. The content was relevant and professional, and the customization options allowed me to add my personal touch. Highly recommended!"
                    </div>
                    <div class="testimonial-author">
                        David R.
                    </div>
                </div>
            </Section>
        </div>
        <div class="testimonial-item-outer">
            <Section>
                <div class="testimonial-item">
                    <div class="quote-img-open">
                        <QuoteOpen />
                    </div>
                    <div class="quote-img-close">
                        <QuoteClose />
                    </div>
                    <div class="testimonial-comment">
                        "I've always struggled with writing cover letters, but Buckshot made it so easy. The AI-generated cover letters were tailored perfectly to each job, saving me time and stress. I felt much more confident submitting my applications."
                    </div>
                    <div class="testimonial-author">
                        Elena G
                    </div>
                </div>
            </Section>
        </div>
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

            .testimonial-item-outer {
                @mixin pop-in-transition {
                    animation:pop-in .2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1;
                }

                transition:transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                &:hover {
                    transform:scale(1.3) rotate(-4deg);
                    z-index:9000;
                }
                height:fit-content;
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
        }

    }


</style>