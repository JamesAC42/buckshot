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

    let workItems = writable([]);

    function handleOnSave() {

        if($workItems.length < 1) {
            error.set("Must have at least 1 work history item.");
            return;
        }

        let cleanedWorkItems = [];
        for(let i = 0; i < $workItems.length; i++) {
            let {
                position,dates,company,description
            } = $workItems[i];
            position = position.trim();
            dates = dates.trim();
            company = company.trim();
            if(
                position.length === 0 ||
                dates.length === 0 ||
                company.length === 0
            ) {
                error.set("Position, dates, and company must have values.");
                return;
            }
            if(
                position.length > 200 ||
                dates.length > 200 ||
                company.length > 200
            ) { 
                error.set("Value too long. Max length is 200 characters.");
                return;
            }

            let trimmedDescription = description.filter(d => d.trim().length > 0);
            if(trimmedDescription.length === 0) {
                error.set("At least one item of description is required.");
                return;
            }
            for(let d = 0; d < trimmedDescription.length; d++) {
                if(trimmedDescription[d].length > 200) {
                    error.set("Value too long. Max length is 200 characters.");
                    return;
                }
            }
            cleanedWorkItems.push({
                position,
                dates,
                company,
                description: trimmedDescription
            });
        }
        if(cleanedWorkItems.length === 0) {
            error.set("No valid work items to save.");
            return;
        }
        onSave(cleanedWorkItems);
    }

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
            <input maxLength={200} type="text" placeholder="position title..." bind:value={$workItems[index].position}>
        </div>
        <div class="workhistory-edit-row work-info">
            <input maxLength={200} type="text" placeholder="position dates..." bind:value={$workItems[index].dates}>
            <input maxLength={200} type="text" placeholder="company name..." bind:value={$workItems[index].company}>
        </div>
        <div class="workhistory-edit-description">
        {#each $workItems[index].description as descItem, descIndex}
            <div class="workhistory-edit-row">
                <Delete onDelete={() => removeDescItem(index, descIndex)}/>
                <input maxLength={200} type="text" placeholder="additional info..." bind:value={$workItems[index].description[descIndex]}/>
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

    .error {
        @include section-edit-error;   
    }

    
    @media screen and (max-width: 1000px) {
        .workhistory-edit-outer {
            .workhistory-edit-item {
                margin:0;
                padding:0.5rem 0;
                margin-bottom:1rem;
                input {
                    width:100%;
                }
                .workhistory-edit-row {
                    padding:0 0.5rem;
                    gap:0.5rem;
                    margin-bottom:0.5rem;
                }
                .workhistory-edit-row.work-info {
                    flex-direction:column;
                    input {
                        width:calc(100% - 1.1rem);
                    }
                }
                .workhistory-edit-description {
                    margin-left:0rem;
                    border:none;
                }
            }
        }
    }

</style>