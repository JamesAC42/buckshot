<script>
    import { createEventDispatcher } from 'svelte';
    export let active = false;
    export let tab;
    export let index = 0;
    export let clicked = false;
    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click', { index: index });
    }
</script>

<div class="section-outer tab-outer {active ? 'active' : ''}">
    <div class="section-background"></div>
    <div 
        class="section-inner tab-inner {clicked ? 'clicked' : ''}"
        tabindex="0"
        role="button"
        on:click={handleClick}
        on:mousedown={() => { clicked = true; }}
        on:mouseup={() => { clicked = false; }}
        on:mouseleave={() => { clicked = false; }}
        on:keydown>
        {tab}
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";
    
    .tab-outer {
        
        width:100%;
        text-align:center;
        margin:0.3rem 0;
        margin-bottom:1rem;
        opacity:0.3;

        @include pop-in-transition;
        @include section-interact;

        cursor:pointer;
        user-select: none;

        &:hover, &.active {
            opacity:1;
        }

    }
    .tab-inner {
        &:hover {
            @include section-hover;
        }
        &.clicked {
            @include section-click;
        }
    }

</style>