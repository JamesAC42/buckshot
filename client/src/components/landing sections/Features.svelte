
<script>

    import Section from "../Section.svelte";

</script>

<div class="features">

    <div class="section-title">
        <h2>Key Features</h2>
    </div>
    <div class="features-inner">
        <div class="feature-item">
            <Section fill>
                <div class="feature-item-inner">
                    <div class="feature-info">
                        <div class="feature-title">
                            Simple Input
                        </div>
                        <div class="feature-description">
                            Two text boxes - you and the job. Don't fight with long forms, let Buckshot figure it out.
                        </div>
                    </div>
                    <div class="feature-image">
                        <img src="/images/features/simple_input.png" alt="simple input"/>
                    </div>
                </div>
            </Section>
        </div>
        <div class="feature-item">
            <Section fill>
                <div class="feature-item-inner">
                    <div class="feature-info">
                        <div class="feature-title">
                            AI Powered Customization
                        </div>
                        <div class="feature-description">
                            A language model tailors your resume to fit the job in subtle but important ways.
                        </div>
                    </div>
                    <div class="feature-image">
                        <img src="/images/features/resume.png" alt="simple input"/>
                    </div>
                </div>
            </Section>
        </div>
        <div class="feature-item">
            <Section fill>
                <div class="feature-item-inner">
                    <div class="feature-info">
                        <div class="feature-title">
                            Flexibility
                        </div>
                        <div class="feature-description">
                            Complete control of each generated section to refine and edit as needed.
                        </div>
                    </div>
                    <div class="feature-image">
                        <img src="/images/features/flexibility.png" alt="simple input"/>
                    </div>
                </div>
            </Section>
        </div>
        <div class="feature-item">
            <Section fill>
                <div class="feature-item-inner">
                    <div class="feature-info">
                        <div class="feature-title">
                            Organization
                        </div>
                        <div class="feature-description">
                            All your job applications in one place.
                        </div>
                    </div>
                    <div class="feature-image">
                        <img src="/images/features/organization.png" alt="simple input"/>
                    </div>
                </div>
            </Section>
        </div>
        <div class="feature-item">
            <Section fill>
                <div class="feature-item-inner">
                    <div class="feature-info">
                        <div class="feature-title">
                            Professional Output
                        </div>
                        <div class="feature-description">
                            Export as a neatly formatted PDF in just a few clicks, no hidden extra charges.
                        </div>
                    </div>
                    <div class="feature-image">
                        <img src="/images/download_examples/download_example_serif_white_medium.png" alt="simple input"/>
                    </div>
                </div>
            </Section>
        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";
    
    .features {

        .features-inner {
            margin: 0 auto;
            @include flex-center-col;
            width:fit-content;
            .feature-item {
                margin-bottom:2rem;
                .feature-item-inner {
                    @include flex-center-row;
                    padding:1rem;
                    gap:1rem;
                    .feature-info {
                        @include flex-center-col;
                        width:15rem;
                        .feature-title {
                            height:fit-content;
                            font-size:1.8rem;
                            font-weight:600;
                            color:#7e7e7e;
                            padding:1rem;
                        }
                        .feature-description {
                            flex:1;
                            padding:0 1rem;
                            font-size:1.2rem;
                        }
                    }
                    .feature-image {
                        img {
                            width:35rem;
                        }
                    }
                    &:last-child {
                        grid-column: 1 / -1; // This makes the last item span both columns
                        
                    }
                }
            }

        }

        margin-bottom:2rem;

    }

    @media screen and (max-width: 1000px) {
        
        .features {
            padding:0 2rem;
            .features-inner {
                .feature-item {
                    .feature-item-inner {
                        .feature-info {
                            width:12rem;
                            .feature-title {
                                font-size:1.6rem;
                            }
                            .feature-description {
                                font-size:1.1rem;
                            }
                        }
                        .feature-image {
                            img {
                                width:30rem;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 800px) {
        
        .features {
            padding:0 1rem;
            .features-inner {
                .feature-item {
                    margin-bottom:1rem;
                    .feature-item-inner {
                        flex-direction: column;
                        align-items: stretch;
                        padding:0rem;
                        .feature-info {
                            width:100%;
                            text-align:center;
                            .feature-title {
                                font-size:1.6rem;
                            }
                            .feature-description {
                                font-size:1.1rem;
                            }
                        }
                        .feature-image {
                            width:100%;
                            img {
                                max-width:calc(100%);
                                width:100%;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 300px) {
        
        .features {
            padding:0 0.5rem;
            .features-inner {
                .feature-item {
                    margin-bottom:0.2rem;
                    .feature-item-inner {
                        padding:0;
                        .feature-info {
                            .feature-title {
                                font-size:1.4rem;
                            }
                            .feature-description {
                                font-size:1rem;
                            }
                        }
                    }
                }
            }
        }
    }


</style>