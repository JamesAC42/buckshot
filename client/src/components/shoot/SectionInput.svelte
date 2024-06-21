<script>

    import CheckBoxOutline from '~icons/material-symbols/check-box-outline-blank';
    import CheckBoxFilled from '~icons/material-symbols/check-box-rounded';
    import LoadingIcon from '~icons/svg-spinners/pulse-2';
    import { jobsStore } from '../../stores/stores';
    import { onDestroy, onMount } from 'svelte';

    import { sections } from '$lib/userSettings';
    import { writable } from 'svelte/store';
    import { saveJobRequiredSections } from '$lib/saveJobInput';

    export let activeJob = "";

    let sectionNames = [];
    let loadingSections = writable({});
    let enabledSections = writable({});
    
    let jobs = null;
    let unsubscribe = null;

    onMount(() => {
        unsubscribe = jobsStore.subscribe(value => {
            jobs = value;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });
        
    async function toggleTemplateItem(item) {
        if(!item) return;
        if(typeof(item) !== "string") return;
        if(!activeJob) return;
        let key = item.toUpperCase().replace(" ","_");

        if(!jobs || !jobs[activeJob]) return;
        let savedSections = JSON.parse(JSON.stringify(jobs[activeJob].requiredSections));
        if(savedSections.includes(key)) {
            savedSections = savedSections.filter(section => section !== key);
        } else {
            savedSections.push(key);
        }

        loadingSections.update(oldLoading => {
            oldLoading[key] = 1;
            return oldLoading;
        });
        const response = await saveJobRequiredSections(activeJob, savedSections);
        loadingSections.update(oldLoading => {
            delete oldLoading[key];
            return oldLoading;
        });
        if(response) {
            jobsStore.update(oldJobs => {
                oldJobs[activeJob].requiredSections = savedSections;
                return oldJobs;
            });
        }
    }

    function toKey(sectionName) {
        return sectionName.toUpperCase().replaceAll(" ", "_");
    }

    function isEnabled(sectionName) {
        return $enabledSections[toKey(sectionName)];
    }

    function isLoading(sectionName) {
        return $loadingSections[toKey(sectionName)];
    }

    $: {
        sectionNames = Object.keys(sections).map((s) => {
            return s.toLowerCase().replaceAll("_", " ");
        });

        if(jobs) {
            let jobInfo = jobs[activeJob];
            if (jobInfo) {
                enabledSections.update(items => {
                    let newSections = {};
                    let savedSections = jobInfo.requiredSections;
                    for(let section of savedSections) {
                        newSections[section] = 1;
                    }
                    return newSections;
                })
            }
        }
    }

</script>

<div class="template-section">
    <div class="template-section-description">
        Toggle which sections of the resume you would like to include and which
        sections to leave out.
    </div>  
    <div class="template-section-items">
        {#each sectionNames as item (item)}
            <div
                class="template-section-item {isEnabled(item)
                    ? 'active'
                    : ''}"
                on:click={() => toggleTemplateItem(item)}
                on:keydown={(event) => {
                    if (event.key === "Enter") toggleTemplateItem(item);
                }}
                tabindex="0"
                role="button"
                aria-pressed={isEnabled(item) ? "true" : "false"}>
                {#if isLoading(item)}
                    <LoadingIcon />
                {:else}
                    {#if isEnabled(item)}
                        <CheckBoxFilled />
                    {:else}
                        <CheckBoxOutline />
                    {/if}
                {/if}

                {item}
            
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .template-section {
        margin-bottom: 1rem;
        position: relative;
        .template-section-description {
            margin-bottom: 0.5rem;
            text-align: center;
        }
        .template-section-items {
            @include wrap-flex-row;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            .template-section-item {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0.3rem 0.8rem;
                gap: 0.5rem;
                border-radius: 0.3rem;
                transition: all 0.1s ease-in-out;

                &:hover,
                &.active {
                    background: $primary-color;
                    color: $secondary-color;
                }

                &:hover {
                    opacity: 0.6;
                }
            }
        }
    }
</style>
