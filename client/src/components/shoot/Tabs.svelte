<script>
    import { get, writable } from "svelte/store";
    import { onDestroy, onMount } from "svelte";
    import postFetch from "$lib/postFetch";
    import { jobsStore, userStore } from '../../stores/stores.js';
    import { tick } from "svelte";

    import Button from "../Button.svelte";
    import Tab from "./Tab.svelte";

    import Plus from '~icons/material-symbols/add-circle-outline-rounded';
    import LoadingIcon from '~icons/svg-spinners/pulse-2';

    export let active = "";
    export let updateActive = (active) => {};
    
    let jobs = null;
    let user = null;
    let unsubscribeJobs = null;
    let unsubscribeUser = null;

    let loading = false;

    onMount(() => {
        unsubscribeJobs = jobsStore.subscribe(value => {
            jobs = value;
            if (jobs && Object.keys(jobs).length > 0) {
                let activeTabId = localStorage.getItem('activetab');
                if (!activeTabId || !jobs[activeTabId]) {
                    activeTabId = Object.keys(jobs)[0];
                    localStorage.setItem('activetab', activeTabId);
                }
                updateActive(activeTabId);
            }
        });

        unsubscribeUser = userStore.subscribe(value => {
            user = value;
        })
    });

    onDestroy(() => {
        if(unsubscribeJobs) {
            unsubscribeJobs();
        }
        if(unsubscribeUser) {
            unsubscribeUser();
        }
    });

    const handleTabClick = (job) => {
        if(updateActive) {
            localStorage.setItem('activetab', job);
            updateActive(job);
        }
    }

    const handleNewTab = async () => {

        if(!user.premium) {
            if(Object.keys(jobs).length >= 10) {
                alert("Free tier users can manage up to 10 jobs at once.");
                return;
            }
        }

        if(loading) return;

        loading = true;
        const response = await postFetch('/api/createJob', null);
        loading = false;
        if(response.success) {
            jobsStore.update(oldJobs => {
                if(oldJobs != null) {
                    oldJobs[response.job.id] = response.job;
                    oldJobs[response.job.id].requiredSections = JSON.parse(oldJobs[response.job.id].requiredSections);
                    return oldJobs;
                } else {
                    return null;
                }
            });

            // Scroll to the bottom of the tabs-container
            tick().then(() => {
                const tabsContainer = document.querySelector('.tabs-container');
                if(tabsContainer) {
                    tabsContainer.scrollTop = tabsContainer.scrollHeight;
                }
            });
        }
    }

    let jobNames = {};
    $: {
        jobNames = {};
        if(jobs) {
            for(let job of Object.keys(jobs)) {
                jobNames[jobs[job].id] = 
                    jobs[job].title ? 
                    jobs[job].title : "untitled job";
            }
        }
    }

</script>

<div class="tabs">
    <div class="tabs-container">
        {#each Object.entries(jobNames) as [id, name], index}
            <Tab 
                active={active === id}
                tab={name}
                index={index}
                onClick={() => handleTabClick(id)} />
        {/each}
    </div>
    <div class="tab-add">
        <Button
            onClick={handleNewTab}
            buttonText="New Job">
            <div class="add-icon">
                {#if loading}
                <LoadingIcon />
                {:else}
                <Plus/>
                {/if}    
            </div>    
        </Button>
    </div>
</div>
<style lang="scss">

    @import "../../styles/mixins.scss";

    .tabs {
        width:12rem;
        min-width:12rem;
        position:sticky;
        top:0;
        padding-top:1rem;
        border-radius:0.2rem;
        background:#f1f1f1;

        .tabs-container {
            padding:0 1rem;
            margin:0 0.5rem;
            max-height:72dvh;
            overflow-y:auto;
            box-shadow:0px -17px 11px -1px #f1f1f1 inset;
        }
    }
    .tab-add {
        margin-top:0rem;
        @include flex-center-row;
        @include pop-in-transition;
    }
    .add-icon {
        transform:translateY(2px);
        margin-right:2px;
    }
</style>