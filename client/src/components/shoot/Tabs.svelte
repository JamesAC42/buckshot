<script>
    import Button from "../Button.svelte";
    import Tab from "./Tab.svelte";
    import { tabsStore } from '../../stores/stores.js';
    import { get, writable } from "svelte/store";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let active= writable(0);

    let maxTabs = 10;
    
    const handleTabClick = (index) => {
        active.set(index);
    }

    const handleNewTab = () => {
        if(get(tabsStore).length >= maxTabs) return;
        tabsStore.update(tabs => {
            return [...tabs, "job name"];
        });
    }

</script>

<div class="tabs">
    {#each $tabsStore as tab, index}
        <Tab 
            active={$active === index}
            tab={tab}
            index={index}
            onClick={(index) => handleTabClick(index)} />
    {/each}
    <div class="tab-add">
        <Button
            onClick={handleNewTab}
            disabled={$tabsStore.length >= maxTabs}
            buttonText="New Tab">
            <div class="add-icon">
                <Plus/>    
            </div>    
        </Button>
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
    .add-icon {
        transform:translateY(2px);
        margin-right:2px;
    }
</style>