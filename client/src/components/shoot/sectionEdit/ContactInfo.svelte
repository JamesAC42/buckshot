<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let contactItems = writable([]);

    function addNewItem() {
        if($contactItems.length >= 10) return;
        contactItems.update(oldItems => {
            oldItems.push("");
            return oldItems;
        });
        setTimeout(() => {
            const listOuter = document.querySelector('.contact-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function removeItem(index) {
        if($contactItems.length === 1) return;
        contactItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    $: {
        if(output[name]) {
            let contacts = JSON.parse(JSON.stringify(output[name]));
            contactItems.set(contacts);
            if(output[name].length === 0) {
                contactItems.set([{
                    label:"",
                    info:""
                }]);
            }
        }
    }

    $: disableAdd = $contactItems.length >= 10;

</script>

<div class="contact-outer">
    {#each $contactItems as item, index}
    <div class="contact-item">

        <Delete onDelete={() => removeItem(index)}/>
        <input class="contact-label" type="text" placeholder="Enter item..." bind:value={$contactItems[index].label} />
        <input class="contact-info" type="text" placeholder="Enter item..." bind:value={$contactItems[index].info} />
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

    .contact-outer {
        @include section-edit-inner;
    }
    .contact-item {
        @include flex-center-row;
        @include appear-text;
        gap:0.5rem;
        margin-bottom:1rem;
        input {
            @include section-edit-input;

            &.contact-label {
                width:20%;
            }

            &.contact-info {
                width:40%;
            }
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