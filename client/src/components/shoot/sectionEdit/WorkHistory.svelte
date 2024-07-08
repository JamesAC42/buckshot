<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let workItems = writable([]);

    function newJob() {
        return {
            position:"",
            company:"",
            dates:"",
            description:[""]
        };
    }

    function scrollBottom() {
        setTimeout(() => {
            const listOuter = document.querySelector('.workhistory-edit-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function addNewJob() {
        if($workItems.length >= 10) return;
        workItems.update(items => {
            items.push(newJob());
            return items;
        });
        
        scrollBottom();
    }

    function removeSchool(index) {
        if($workItems.length === 1) return;
        workItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    function addNewDescItem(index) {
        if($workItems[index].description.length >= 10) return;
        workItems.update(items => {
            items[index].description.push("");
            return items;
        });
        if(index === $workItems.length - 1) {
            scrollBottom();
        }
    }

    function removeDescItem(index, indexItem) {
        if($workItems[index].description.length === 1) return;
        workItems.update(items => {
            items[index].description.splice(indexItem, 1);
            return items;
        });
    }

    $: {
        if(output[name]) {
            workItems.set(JSON.parse(JSON.stringify(output[name])));
            if(output[name].length === 0) {
                workItems.set([newJob()]);
            }
        }
    }

    $: disableAddJob = $workItems.length >= 10;

    let disableAddItem;
    $: {
        disableAddItem = {};
        for(let i = 0; i < $workItems.length; i++) {
            disableAddItem[i] = $workItems[i].description.length >= 10;
        }
    }

</script>

<div class="workhistory-edit-outer">

    {#each $workItems as item, index}
    <div class="workhistory-edit-item">
        <div class="workhistory-edit-row">
            <Delete onDelete={() => removeSchool(index)}/>
            <input type="text" placeholder="position title..." bind:value={$workItems[index].position}>
        </div>
        <div class="workhistory-edit-row">
            <input type="text" placeholder="position dates..." bind:value={$workItems[index].dates}>
            <input type="text" placeholder="company name..." bind:value={$workItems[index].company}>
        </div>
        <div class="workhistory-edit-description">
        {#each $workItems[index].description as descItem, descIndex}
            <div class="workhistory-edit-row">
                <Delete onDelete={() => removeDescItem(index, descIndex)}/>
                <input type="text" placeholder="additional info..." bind:value={$workItems[index].description[descIndex]}/>
            </div>
        {/each}
        </div>
        <div class="add-item">
            <div
                on:click={() => addNewDescItem(index)}
                on:keydown={(e) => {if(e.key=== "Enter") addNewDescItem()}}
                role="button"
                tabindex="0"
                class={"add-item-button " + (disableAddItem[index] ? "disabled" : "")}>
                <div class="btn-label">New Item</div>
                <div class="btn-icon"><Plus/></div>
            </div>
        </div>
    </div>
    {/each}
    <div class="add-item">
        <div
            on:click={addNewJob}
            on:keydown={(e) => {if(e.key=== "Enter") addNewJob()}}
            role="button"
            tabindex="0"
            class={"add-item-button " + (disableAddJob ? "disabled" : "")}>
            <div class="btn-label">New Item</div>
            <div class="btn-icon"><Plus/></div>
        </div>
    </div>

</div>
<Actions onClose={onClose} onSave={onSave}/>

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .workhistory-edit-outer {
        @include section-edit-inner;

        .workhistory-edit-item {

            padding:1rem 0;
            border:1px solid #adadad;
            box-shadow:-2px 2px 5px 0px #a0a0a0;
            margin:0 1rem 1rem 1rem;
            border-radius:0.3rem;

            .workhistory-edit-row {
                position:relative;
                height:100%; 
                padding:0 1rem;
                gap:1rem;
                @include flex-center-row;
                @include appear-text;
                margin-bottom:1rem;
    
                input {
                    @include section-edit-input;
                    flex:1;
                }
            }
            .workhistory-edit-description {
                border-left:4px solid #aeaeae;
                margin-left:1.2rem;
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