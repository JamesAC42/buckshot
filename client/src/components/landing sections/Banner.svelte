<script>

    import Cta from "./CTA.svelte";

</script>

<div class="banner">
    <div class="banner-inner">
        <img class="logo" src="/images/logo.png" alt="Logo" />
        <div class="title">
            <div class="title-inner">Applying to jobs is a grind.<br> Buckshot makes it a breeze.</div>
            <div class="subtitle">AI-assisted resume tailoring for every job application, with 1 click.</div>
            <Cta />
        </div>
        <img class="logo flipped" src="/images/logo.png" alt="Logo" />
    </div>
</div>

<style lang="scss">
    
    @import "../../styles/mixins.scss";

    .banner {
        height:40vh;
        max-height:40vh;
        min-height:40vh;
        width:100vw;
        background:$primary-color;
        background:$background;
        position:relative;
        @include flex-center-col;
        align-items: center;
        justify-content: center;

        border-radius:0 0 3rem 3rem;

        .banner-inner {
            @include flex-center-row;
            transform:translateY(-1.5rem);
            align-items:center;
            .title {
                display:flex;
                flex-direction: column;
                gap:2rem;
                align-items: center;
                text-align:center;
                .title-inner {
                    color:$secondary-color;
                    font-weight:500;
                    font-size:4rem;
                }
                .subtitle {
                    color:$secondary-color;
                    font-size:1.3rem;
                }
                
            }
            .logo {
                max-height:23vh;
                transform:rotateY(180deg);
            }
            .logo.flipped {
                transform:none;
            }
        }

        .blurb {
            color:$secondary-color;
            transform:translateY(-1rem);
            font-size:1.3rem;
            font-weight:500;
        }
    }

    @media screen and (max-width: 1200px) {

        .banner {
            .banner-inner {
                .title {
                    .title-inner {
                        font-size:2.4rem;
                    }
                    .subtitle {
                        font-size:1rem;
                    }
                }
                .logo {
                    max-height:18vh;
                }
            }
        }
    
    }

    @media screen and (max-width: 800px) {
        .banner {
            min-height:60dvh;
            border-radius:0 0 1rem 1rem;
        }
    }

    @media screen and (max-width: 600px) {
        .banner {
            min-height:50dvh;
            border-radius:0;
            .banner-inner {
                padding:1rem 2rem;
                flex-direction: column;
                transform:translate(0,-3rem);
                .title {
                    .title-inner {
                        font-size:2rem;
                    }
                    .subtitle {
                        font-size:0.9rem;
                    }
                }
                .logo {
                    max-height:20vh;
                    &:last-child {
                        display:none;
                    }
                }
            }
        }
    }

    @media screen and (max-height: 700px) {

        .banner {
            min-height:80dvh;
        }

    }

    @media screen and (max-width: 750px) {

        .banner {
            min-height:70dvh;
            .banner-inner {
                transform:translate(0,-2rem);
            }
        }

    }

    @media screen and (max-width: 460px) {

        .banner {
            .banner-inner {
                padding:1rem 2rem;
                .title {
                    gap:0.58rem;
                    .title-inner {
                        font-size:1.8rem;
                    }
                    .subtitle {
                        font-size:0.9rem;
                    }
                }
                .logo {
                    max-height:14vh;
                }
            }
        }

    }

    @media screen and (max-width: 320px) {

        .banner {
            .banner-inner {
                padding:0.5rem 2rem;
                .title {
                    gap:0.8rem;
                    .title-inner {
                        font-size:1.8rem;
                    }
                    .subtitle {
                        font-size:0.9rem;
                    }
                }
                .logo {
                    max-height:12vh;
                }
            }
        }

    }

    @media screen and (max-width: 280px) {

        
        .banner {
            .banner-inner {
                padding:0.2rem 1rem;
                .title {
                    gap:0.8rem;
                    .title-inner {
                        font-size:1.6rem;
                    }
                    .subtitle {
                        font-size:0.9rem;
                    }
                }
                .logo {
                    max-height:12vh;
                }
            }
        }

    }

</style>