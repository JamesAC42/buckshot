<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = (content) => {}
    export let onClose = () => {}

    export let error;
    export let loading = false;

    let contactItems = writable([]);
    
    function handleOnSave() {
        
        let filtered = [];
        for(let i = 0; i < $contactItems.length; i++) {
            
            if(
                $contactItems[i].label.trim().length === 0 ||
                $contactItems[i].info.trim().length === 0
            ) {
                error.set("Cannot have empty value.");
                return;
            }

            filtered.push({
                label: $contactItems[i].label.trim(),
                info: $contactItems[i].info.trim()
            });
        }
        if(filtered.length === 0) {
            error.set("Need at least 1 contact item.");
            return;
        }
        onSave(filtered);
    }

    function addNewItem() {
        if($contactItems.length >= 10) return;
        contactItems.update(oldItems => {
            oldItems.push({
                label:"",
                info:""
            });
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
        <input class="contact-label" maxLength={200} type="text" placeholder="Enter item..." bind:value={$contactItems[index].label} />
        <input class="contact-info" maxLength={200} type="text" placeholder="Enter item..." bind:value={$contactItems[index].info} />
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
    {#if $error}
    <div class="error">{$error}</div>
    {/if}
</div>
<Actions 
    disabled={loading}
    loading={loading}
    onClose={onClose} 
    onSave={handleOnSave}/>

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

    .error {
        @include section-edit-error;   
    }
    @media screen and (max-width: 900px) {
        .contact-item {
            input.contact-label {
                width:20%;
            }
            input.contact-info {
                width:60%;
            }
        }
    }

</style>