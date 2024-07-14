<script>

    let mouseCoords = { x: 0, y: 0 };
    
    import RightArrow from "~icons/material-symbols/arrow-circle-right";
    import Target from "~icons/solar/target-linear";

    export let float = false;

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
<div 
    class="cta-button" class:float={float}
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

<style lang="scss">

    @import "../../styles/mixins.scss";

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
    .cta-button {
        position:relative;
        overflow:hidden;
        border-radius:1rem;
        border:1px solid $primary-color;
        transition:all .2s ease-in-out;
        width:fit-content;
        margin:0 auto;
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

        &.float {
            box-shadow:0px 4px 7px 0px #10101077;
        }
    }

</style>