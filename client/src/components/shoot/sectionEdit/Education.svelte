<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let educationItems = writable([]);

    function newSchool() {
        return {
                    school: "",
                    dates: "",
                    major: "",
                    description: [""]
                };
    }

    function scrollBottom() {
        setTimeout(() => {
            const listOuter = document.querySelector('.education-edit-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function addNewSchool() {
        if($educationItems.length >= 10) return;
        educationItems.update(items => {
            items.push(newSchool());
            return items;
        });
        
        scrollBottom();
    }

    function removeSchool(index) {
        if($educationItems.length === 1) return;
        educationItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    function addNewDescItem(index) {
        if($educationItems[index].description.length >= 10) return;
        educationItems.update(items => {
            items[index].description.push("");
            return items;
        });
        if(index === $educationItems.length - 1) {
            scrollBottom();
        }
    }

    function removeDescItem(index, indexItem) {
        if($educationItems[index].description.length === 1) return;
        educationItems.update(items => {
            items[index].description.splice(indexItem, 1);
            return items;
        });
    }

    $: {
        if(output[name]) {
            educationItems.set(JSON.parse(JSON.stringify(output[name])));
            if(output[name].length === 0) {
                educationItems.set([newSchool()]);
            }
        }
    }

    $: disableAddSchool = $educationItems.length >= 10;

    let disableAddItem;
    $: {
        disableAddItem = {};
        for(let i = 0; i < $educationItems.length; i++) {
            disableAddItem[i] = $educationItems[i].description.length >= 10;
        }
    }

</script>

<div class="education-edit-outer">

    {#each $educationItems as item, index}
    <div class="education-edit-item">
        <div class="education-edit-row">
            <Delete onDelete={() => removeSchool(index)}/>
            <input type="text" placeholder="school name..." bind:value={$educationItems[index].school}>
        </div>
        <div class="education-edit-row">
            <input type="text" placeholder="school dates..." bind:value={$educationItems[index].dates}>
            <input type="text" placeholder="major..." bind:value={$educationItems[index].major}>
        </div>
        <div class="education-edit-description">
        {#each $educationItems[index].description as descItem, descIndex}
            <div class="education-edit-row">
                <Delete onDelete={() => removeDescItem(index, descIndex)}/>
                <input type="text" placeholder="additional info..." bind:value={$educationItems[index].description[descIndex]}/>
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
            on:click={addNewSchool}
            on:keydown={(e) => {if(e.key=== "Enter") addNewSchool()}}
            role="button"
            tabindex="0"
            class={"add-item-button " + (disableAddSchool ? "disabled" : "")}>
            <div class="btn-label">New Item</div>
            <div class="btn-icon"><Plus/></div>
        </div>
    </div>

</div>
<Actions onClose={onClose} onSave={onSave}/>

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .education-edit-outer {
        @include section-edit-inner;

        .education-edit-item {

            padding:1rem 0;
            border:1px solid #adadad;
            box-shadow:-2px 2px 5px 0px #a0a0a0;
            margin:0 1rem 1rem 1rem;
            border-radius:0.3rem;

            .education-edit-row {
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
            .education-edit-description {
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