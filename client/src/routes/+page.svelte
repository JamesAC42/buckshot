<script>
    import Navbar from "../components/Navbar.svelte";
    import RightArrow from "~icons/material-symbols/arrow-circle-right";
    import Target from "~icons/solar/target-linear";
    
    let mouseCoords = { x: 0, y: 0 };
    
    function handleMouseMove(event) {
        if(!event) return;
        const rect = event.target.getBoundingClientRect();
        mouseCoords.x = event.clientX - rect.left;
        mouseCoords.y = event.clientY - rect.top;
        event.stopPropagation();
    }
    
    function stopMouseMove(event) {
        event.stopPropagation();
        return;
    }

    function handleClick() {
        window.location.href = '/shoot';
    }

</script>

<svelte:head>
    <title>buckshot</title> 
</svelte:head>

<Navbar/>

<div class="container home-container">

    <div class="banner">
        <div class="banner-inner">
            <img class="logo" src="/images/logo.png" alt="Logo" />
            <div class="title">
                <div class="title-inner">buckshot</div>
                <div 
                    class="cta-button" 
                    on:mousemove={handleMouseMove} 
                    role="button" 
                    tabindex="0">
                    <div class="cta-button-background"></div>
                    <div 
                        class="cta-button-hover" 
                        style="position: absolute; left: {mouseCoords.x}px; top: {mouseCoords.y}px;">
                        <Target/>
                    </div>
                    <div
                        on:click={handleClick} 
                        on:keydown={handleClick}
                        role="button" 
                        tabindex="0"
                        class="cta-button-inner">
                        get started - it's free
                        <div 
                            on:mousemove={stopMouseMove} 
                            role="button" 
                            tabindex="-1"
                            class="arrow">
                            <RightArrow/>
                        </div>
                    </div>
                </div>
            </div>
            <img class="logo flipped" src="/images/logo.png" alt="Logo" />
        </div>
        <div class="blurb">
            Applying to jobs is a grind. Buckshot makes it a breeze.
        </div>
    </div>

    <div class="screenshot-outer">
        <div class="screenshot-container">
            <div class="section-background screenshot-background"></div>
            <div class="screenshot-inner">
                <img src="/images/screenshot.png" alt="Screenshot" />
            </div>
        </div>
    </div>

    <div class="about">

    </div>

    <div class="testimonials">

    </div>

    <div class="premium">

    </div>

    <div class="contact">

    </div>

    <div class="footer">
        <div class="footer-inner">
            <div>&copy; 2023 buckshot. All rights reserved.</div>
        </div>
    </div>

</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    $background: #101010;

    @keyframes oscillate {
        0% {
            transform:translate(0,3px);
        }
        50% {
            transform:translate(-10px,3px);
        }
        100% {
            transform:translate(0,3px);
        }
    }

    @keyframes expand-cta-background {
        0% {
            transform:translate(-50%,-50%) scale(0);
        }
        100% {
            transform:translate(-50%,-50%) scale(1);
        }
    }

    .home-container {
        padding:0;
        overflow-x:hidden;
        height:calc(100vh - 5rem);
        display:flex;
        flex-direction: column;
        gap:0;
        overflow-y:scroll;
    }

    .banner {
        height:40vh;
        max-height:40vh;
        min-height:40vh;
        width:100vw;
        background:$background;
        position:relative;
        @include flex-center-col;
        align-items: center;
        justify-content: center;

        .banner-inner {
            @include flex-center-row;
            align-items:center;
            .title {
                display:flex;
                flex-direction: column;
                gap:1rem;
                align-items: center;
                .title-inner {
                    color:$secondary-color;
                    font-weight:500;
                    font-size:4.5rem;
                }
                .cta-button {
                    position:relative;
                    overflow:hidden;
                    border-radius:1rem;
                    border:1px solid $primary-color;
                    transition:all .2s ease-in-out;
                    .cta-button-inner {
                        padding:0.5rem 1.5rem;
                        padding-right:1rem;
                        text-align:center;
                        border-radius:0.9rem;
                        display:flex;
                        flex-direction: row;
                        gap:1.5rem;
                        align-items:center;
                        justify-content: space-between;
                        z-index:10;
                        position:relative;
                        cursor:pointer;
                        transition:color .2s ease-in-out;
                        .arrow {
                            transform:translateY(2px);
                            animation:oscillate 1s ease-in-out infinite;
                            pointer-events: none;
                        }
                        &:hover {
                            color:$secondary-color;
                        }
                    }
                    .cta-button-background {
                        position:absolute;
                        height:100%;width:100%;
                        top:0;left:0;
                        border-radius:1rem;
                        background:$secondary-color;
                        z-index:1;
                    }
                    .cta-button-hover {
                        position:absolute;
                        height:30rem;width:30rem;
                        border-radius:50%;
                        background:$primary-color;
                        transform: translate(-50%,-50%) scale(0);
                        z-index:2;
                        color:$secondary-color;
                        font-size:2rem;
                        @include flex-center-col;
                        align-items: center;
                    }
                    &:hover {
                        outline:2px solid $secondary-color;
                        .cta-button-hover {
                            height:30rem;width:30rem;
                            transform:translate(-50%,-50%) scale(1);
                            animation:expand-cta-background 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
                            animation:expand-cta-background 1s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                            animation:expand-cta-background 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1;
                        }
                    }
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

    .screenshot-outer {

        @include flex-center-row;

        .screenshot-container {
            position:relative;
            transform:scale(0.984) translate(10px,-5vh);
            height:fit-content;
            width:auto;

            .screenshot-background {
                transform:translate(-20px, 10px);
                background:$secondary-color;
                border-radius:14px;
                border:4px solid $background;
                box-shadow: -5px 5px 20px -10px $background;
            }

            .screenshot-inner {
                border:4px solid $background !important;
                width:fit-content;
                z-index:1000;
                overflow:hidden;
                border-radius:14px;
                background:$secondary-color;
                box-shadow: -5px 5px 15px -5px $background;
                img {
                    max-width:70vw;
                }
            }
        }

    }

    .about {

    }

    .testimonials {

    }

    .premium {

    }

    .contact {

    }

    .footer {
        min-height:20vh;
        .footer-inner {
            text-align:center;
            margin-top:auto;
        }
    }


</style>