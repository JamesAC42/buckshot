<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";
    import Delete from "./Delete.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let projectItems = writable([]);

    function addNewItem() {
        if($projectItems.length >= 10) return;
        projectItems.update(oldItems => {
            oldItems.push("");
            return oldItems;
        });
        setTimeout(() => {
            const listOuter = document.querySelector('.project-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function removeItem(index) {
        if($projectItems.length === 1) return;
        projectItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    $: {
        if(output[name]) {
            let projects = JSON.parse(JSON.stringify(output[name]));
            projectItems.set(projects);
            if(output[name].length === 0) {
                projectItems.set([{
                    name:"",
                    description:""
                }]);
            }
        }
    }

    $: disableAdd = $projectItems.length >= 10;

</script>

<div class="project-outer">
    {#each $projectItems as item, index}
    <div class="project-item">

        <Delete onDelete={() => removeItem(index)}/>
        <input class="project-name" type="text" placeholder="project name..." bind:value={$projectItems[index].name} />
        <input class="project-description" type="text" placeholder="description..." bind:value={$projectItems[index].description} />
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

    .project-outer {
        @include section-edit-inner;
    }
    .project-item {
        @include flex-center-row;
        @include appear-text;
        gap:0.5rem;
        margin-bottom:1rem;
        input {
            @include section-edit-input;

            &.project-name {
                width:20%;
            }

            &.project-description {
                width:50%;
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