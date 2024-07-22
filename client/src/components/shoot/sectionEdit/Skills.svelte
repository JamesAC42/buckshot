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

    let skillItems = writable([]);

    function handleOnSave() {

        let skills = {};
        for(let s = 0; s < $skillItems.length; s++) {
            let skillItem = $skillItems[s];
            let skillType = skillItem.skillType.trim();
            if(skillType.length === 0) {
                error.set("Cannot have empty skill category name.");
                return;
            }
            if(skillType.length > 200) {
                error.set("Skill type too long.");
                return;
            }
            if(skills[skillItem.skillType]) {
                error.set("Cannot have more than one category with the same name.");
                return;
            }

            let filteredItems = skillItem.skills.filter(sk => sk.trim().length > 0);
            if(filteredItems.length === 0) {
                error.set("Each category must have at least one skill.");
                return;
            }
            for(let k = 0; k < filteredItems.length; k++) {
                if(filteredItems[k].length > 200) {
                    error.set("Value too long.");
                    return;
                }
            }
            skills[skillItem.skillType] = filteredItems;
        }
        onSave(skills);

    }

    function scrollBottom() {
        setTimeout(() => {
            const listOuter = document.querySelector('.skills-edit-outer');
            const lastItem = listOuter.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }

    function addNewSkill() {
        if($skillItems.length >= 10) return; 
        skillItems.update(items => {
            items.push({
                skillType: "",
                skills: [""]
            });
            return items;
        })
        scrollBottom();
    }

    function removeSkill(index) {
        if($skillItems.length === 1) return;
        skillItems.update(oldItems => {
            oldItems.splice(index, 1);
            return oldItems;
        })
    }

    function addNewDescItem(index) {
        if($skillItems[index].skills.length >= 20) return;
        skillItems.update(items => {
            items[index].skills.push("");
            return items;
        });
        if(index === $skillItems.length - 1) {
            scrollBottom();
        }
    }

    function removeDescItem(index, indexItem) {
        if($skillItems[index].skills.length === 1) return;
        skillItems.update(items => {
            items[index].skills.splice(indexItem, 1);
            return items;
        });
    }

    $: {
        if(output[name]) {
            let skills = JSON.parse(JSON.stringify(output[name]));
            let skillItemsList = [];
            let skillNames = Object.keys(skills);
            for(let i = 0; i < skillNames.length; i++) {
                skillItemsList.push({
                    skillType: skillNames[i],
                    skills: skills[skillNames[i]]
                });
            }
            skillItems.set(skillItemsList);
            if(skillNames.length === 0) {
                skillItems.set([{
                    skillType: "",
                    skills: [""]
                }]);
            }
        }
    }

    $: disableAddSkill = $skillItems.length >= 10;

    let disableAddItem;
    $: {
        disableAddItem = {};
        for(let i = 0; i < $skillItems.length; i++) {
            disableAddItem[i] = $skillItems[i].skills.length >= 20;
        }
    }
</script>

<div class="skills-edit-outer">

    {#each $skillItems as item, index}
    <div class="skills-edit-item">
        <div class="skills-edit-column skill-type">
            <div class="skills-edit-row">
                <Delete onDelete={() => removeSkill(index)}/>
                <input maxLength={200} type="text" placeholder="skill type..." bind:value={$skillItems[index].skillType}>
            </div>
        </div>
        <div class="skills-edit-column skills">
            {#each $skillItems[index].skills as descItem, descIndex}
                <div class="skills-edit-row">
                    <input maxLength={200} type="text" placeholder="skill..." bind:value={$skillItems[index].skills[descIndex]}/>
                    <Delete onDelete={() => removeDescItem(index, descIndex)}/>
                </div>
            {/each}
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
    </div>
    {/each}
    <div class="add-item">
        <div
            on:click={addNewSkill}
            on:keydown={(e) => {if(e.key=== "Enter") addNewSkill()}}
            role="button"
            tabindex="0"
            class={"add-item-button " + (disableAddSkill ? "disabled" : "")}>
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

    .skills-edit-outer {
        @include section-edit-inner;

        .skills-edit-item {

            padding:1rem;
            border:1px solid #adadad;
            box-shadow:-2px 2px 5px 0px #a0a0a0;
            margin:0 1rem 1rem 1rem;
            border-radius:0.3rem;
            display:flex;
            flex-direction:row;
            align-items:stretch;
            gap:0.5rem;

            .skills-edit-row, .skills-edit-column {
                position:relative;
                padding:0;
                gap:1rem;
            }

            .skills-edit-row {
                @include flex-center-row;
                @include appear-text;
                input {
                    @include section-edit-input;
                    flex:1;
                }
            }

            .skills-edit-column {
                display:flex;
                flex-direction: column;
                align-items:stretch;
                flex:1;
                gap:0.5rem;
                &.skill-type {
                    flex:1;
                }
                &.skills {
                    flex:2;
                }
            }
        }

    }

    .add-item {
        margin-top:0.5rem;
        .add-item-button {
            @include simple-button;
            margin:0 auto;
            width:fit-content;
        }
    }
    .error {
        @include section-edit-error;   
    }

    @media screen and (max-width: 600px) {

        .skills-edit-outer {
            .skills-edit-item {
                flex-direction: column;
            }
        }

    }

</style>