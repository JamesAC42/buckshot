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
</style>