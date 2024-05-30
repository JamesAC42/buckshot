<script>
    import Button from "../Button.svelte";
    import Tab from "./Tab.svelte";
    export let active=0;
    import { tabsStore } from '../../stores/stores.js';
    import { get } from "svelte/store";

    let maxTabs = 100;
    
    /**
     * @param {CustomEvent} event
     */
    const handleTabClick = (event) => {
        active = event.detail.index;
    }
    /**
     * @param {CustomEvent} event
     */
    const handleNewTab = (event) => {
        if(get(tabsStore).length >= maxTabs) return;
        tabsStore.update(tabs => {
            return [...tabs, "job name"];
        });
    }

</script>

<div class="tabs">
    {#each $tabsStore as tab, index}
        <Tab 
            active={active === index}
            tab={tab}
            index={index}
            on:click={handleTabClick} />
    {/each}
    <div class="tab-add">
        <Button
            on:click={handleNewTab}
            disabled={$tabsStore.length >= maxTabs}
            buttonText="New Tab"></Button>
    </div>
</div>
<style lang="scss">

    @import "../../styles/mixins.scss";

    .tabs {
        width:10rem;
        position:sticky;
        top:0;
    }
    .tab-add {
        margin-top:1rem;
        @include flex-center-row;
        @include pop-in-transition;
    }
</style>