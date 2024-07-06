<script>

    export let items = {};
    export let selected = 0;

    export let setSelected = (index) => {};

    function getSelectedIndex(selected) {
        let keys = Object.keys(items);
        for(let i = 0; i < keys.length; i++) {
            if(items[keys[i]] === selected) {
                return i;
            }
        }
        return 0;
    }

    $: selectedIndex = getSelectedIndex(selected);

</script>

{#if Object.keys(items).length > 0}
<div class="slider">
    <div class="slider-background">
    </div>
    <div class="slider-items">
        {#each Object.keys(items) as val, index}
            <div 
                class="slider-item"
                role="button"
                tabindex="0"
                on:keydown={() => setSelected(val)}
                on:click={() => setSelected(val)}>
            {#if index === 0}
                <div
                    style={`transform:translateX(${selectedIndex * 100}%)`} 
                    class="indicator"></div>
            {/if}
            <div class={`slider-item-inner ${selected === items[val] ? "active" : ""}`}>
                <div class="slider-item-value">
                    {val.toLowerCase().replaceAll("_", " ")}
                </div>
            </div>
            </div>
        {/each}
    </div>
</div>
{/if}

<style lang="scss">

    @import "../styles/mixins.scss";

    .slider {
        position:relative;
        border:1px solid $primary-color;
        border-radius:calc(0.3rem + 1px);
        overflow:hidden;
        .slider-background {
            position:absolute;
            height:100%;width:100%;
            background:$secondary-color;
        }
        .slider-items {
            position:relative;
            display:flex;
            flex-direction:row;
            align-items: stretch;
            margin-bottom:-1px;
            .slider-item {
                cursor:pointer;
                padding:0.3rem 0.4em;
                text-align: center;
                position:relative;
                font-size:0.8rem;
                width:100%;
                .indicator {
                    position:absolute;
                    background:$primary-color;
                    border-radius:0.3rem;
                    top:0;left:0;
                    height:100%;width:100%;
                    transition:transform .15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .slider-item-inner {
                    position:relative;
                    color:$primary-color;
                    width:4rem;
                    margin:0 auto;
                    transition:all .1s ease-in-out;
                    height:100%;
                    @include flex-center-col;
                    &.active {
                        color:$secondary-color;
                    }
                }

                &:hover {
                    .slider-item-inner {
                        opacity:0.8;
                    }
                }
            }
        }
    }

</style>