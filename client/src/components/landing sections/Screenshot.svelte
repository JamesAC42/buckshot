

<div class="screenshot-outer">
    <div class="screenshot-container">
        <div class="section-background screenshot-background"></div>
        <div class="screenshot-inner">
            <img src="/images/screenshot.png" alt="Screenshot" />
        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .screenshot-outer {

        @include flex-center-row;

        .screenshot-container {
            position:relative;
            transform:scale(0.984) translate(10px,-5vh);
            height:fit-content;
            width:auto;

            .screenshot-background {
                transform:translate(-4px, -3px);
                background:$secondary-color;
                background:$primary-color;
                background:$background;
                border-radius:14px;
                border:4px solid $background;
                box-shadow: 0 10px 20px -10px $background;
            }

            .screenshot-inner {
                border:4px solid $background !important;
                width:fit-content;
                z-index:1000;
                overflow:hidden;
                border-radius:14px;
                background:$secondary-color;
                box-shadow: 0px 5px 20px -2px $background;
                img {
                    max-width:70vw;
                }
            }
        }

    }
</style>