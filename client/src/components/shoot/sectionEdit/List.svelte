<script>
    import { writable } from "svelte/store";
    
    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let listItems = writable([]);
    
    function addNewItem() {
        if($listItems.length >= 10) return;
        listItems.update(oldItems => {
            oldItems.push("");
            return oldItems;
        });
        setTimeout(() => {
            const listOuter = document.querySelector('.list-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function removeItem(index) {
        if($listItems.length === 1) return;
        listItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    $: {
        if(output[name]) {
            listItems.set(JSON.parse(JSON.stringify(output[name])));
            if(output[name].length === 0) {
                listItems.set([""]);
            }
        }
    }

    $: disableAdd = $listItems.length >= 10;

</script>

<div class="list-outer">
    {#each $listItems as item, index}
        <div class="list-item">
            <Delete onDelete={() => removeItem(index)}/>
            <input type="text" placeholder="Enter item..." bind:value={$listItems[index]} />
        </div>
    {/each}
    <div class="add-item">
        <div
            on:click={addNewItem}
            on:keydown={(e) => {if(e.key=== "Enter") addNewItem()}}
            role="button"
            tabindex="0"
            class={"add-item-button " + (disableAdd ? "disabled" : "")}>
            <div class="btn-label">New Item</div>
            <div class="btn-icon"><Plus/></div>
        </div>
    </div>
</div>
<Actions onClose={onClose} onSave={onSave}/>

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .list-outer {
        @include section-edit-inner;
    }

    .list-item {
        @include flex-center-row;
        @include appear-text;
        gap:0.5rem;
        margin-bottom:1rem;
        input {
            @include section-edit-input;
            width:70%;
        }
    }

    .add-item {
        .add-item-button {
            @include simple-button;
            margin:0 auto;
            width:fit-content;
        }
    }

</style>