<script>

    export let buttonText = "Click Me";
    export let disabled = false;
    export let loading = false; 
    export let onClick = () => {};
    let isPressed = false;

    function handleMouseDown() {
        isPressed = true;
    }

    function handleMouseUp() {
        isPressed = false;
    }

    function handleClick(e) {
        console.log("button click", e);
        if (disabled) return;
        if (onClick) {
            if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
                onClick();
            }
        }
    }

    import LoadingIcon from '~icons/svg-spinners/pulse-2';

</script>

<div
    class={"button-container" + (isPressed ? " button-pressed" : "") + (disabled ? " disabled" : "")}
    role="button"
    tabindex="0"
    on:click={handleClick}
    on:mousedown={handleMouseDown} 
    on:mouseup={handleMouseUp} 
    class:is-pressed={isPressed}
    on:keydown={handleClick}>

    <div class="section-background"></div>
    <div class="section-inner button-container-inner">
        <slot/>
        {buttonText}
        {#if loading}
            <div class="loading">
                <LoadingIcon />
            </div>
        {/if}
    </div>
</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    @keyframes show-loading {
        0% { 
            max-width:0;
        }
        100% {
            max-width:5rem;
        }
    }

    .button-container {
        position:relative;
        width:fit-content;
        margin:1rem 0;
        @include pop-in-transition;
        .button-container-inner {
            padding:0.3rem;
            @include section-interact;
            display:flex;
            flex-direction: row;
            align-items: center;
            &:hover {
                @include section-hover;
            }

            .loading {
                width:fit-content;
                overflow:hidden;
                width:1rem;
                margin-left:0.5rem;
                @include flex-center-row;
                animation:show-loading 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
            }
        }

        &.button-pressed {
            .button-container-inner {
                @include section-click;
            }
        }

        &.disabled {
            opacity:0.4;
            cursor:default;
            .button-container-inner {
                cursor:default;
            }
            .button-container-inner:hover {
                color:$primary-color;
                background:$secondary-color;
                outline:none;
                border:1px solid $primary-color;
            }
        }
    
    }


</style>
