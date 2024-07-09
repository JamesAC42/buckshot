<script>
    import { onDestroy, onMount } from 'svelte';
    import { get, writable } from 'svelte/store';

    import { authGuard } from '$lib/authGuard';
    import postFetch from '$lib/postFetch';
    import getFetch from '$lib/getFetch';
    import formatOutputAsMarkdown from '$lib/formatOutputAsMarkdown';
    import formatLetterAsMarkdown from '$lib/formatLetterAsMarkdown';

    import Navbar from "../../components/Navbar.svelte";
    import Button from '../../components/Button.svelte';
    import Tabs from '../../components/shoot/Tabs.svelte';
    import Settings from '../../components/shoot/Settings.svelte';
    import Output from '../../components/shoot/Output.svelte';
    import OutputPages from '../../components/shoot/OutputPages.svelte';
    import UserInput from '../../components/shoot/UserInput.svelte';
    import SectionInput from '../../components/shoot/SectionInput.svelte';

    import Trash from '~icons/ph/trash';
    import LoadingIcon from '~icons/svg-spinners/pulse-2';

    import { jobsStore, settingsStore, userStore } from '../../stores/stores';
    import { saveJobTitle } from '$lib/saveJobInput';
    import { mode } from '../../lib/userSettings';
    import OutputInfo from '../../components/shoot/OutputInfo.svelte';

    let user = null;
    let jobs = null;
    let unsubscribe = null;
    let settings = null;
    let unsubscribeSettings = null;
    let unsubscribeUser = null;

    let activeJob = writable("");
    let previousActiveJob = activeJob;
    
    let outputsLoaded = {};
    let outputsViewed = {};

    let loading = writable(false);
    let loadingDelete = writable(false);
    let loadingOutputPages = writable(false);
    let outputText = writable(null);
    let outputMode = writable("");
    let stopStreaming = writable(false);
    let activePage = writable(0);
    let outputError = writable(false);

    let title = "";

    onMount(async () => {
        user = await authGuard();
        unsubscribe = jobsStore.subscribe(async (value) => {

            jobs = value;

            if(jobs && Object.keys(jobs).length === 0) {
                const response = await postFetch("/api/createJob", null);
                if(response.success) {
                    jobsStore.update(oldJobs => {
                        if(oldJobs) {
                            oldJobs[response.job.id] = response.job;
                            oldJobs[response.job.id].requiredSections = JSON.parse(oldJobs[response.job.id].requiredSections);
                            return oldJobs;
                        } else {
                            return null;
                        }
                    })

                } else {
                    console.error(response.message);
                }
            }

            if(jobs) {
                let jobIds = Object.keys(jobs);
                for(let j = 0; j < jobIds.length; j++) {
                    if(jobs[jobIds[j]].outputs) {
                        outputsLoaded[jobIds[j]] = true;
                    }
                }

                if(!$activePage || !$activeJob) return;
                if(outputsLoaded[$activeJob]) {
                    let outputItem = jobs[$activeJob].outputs[$activePage - 1];
                    outputMode.set(outputItem.mode === mode.RESUME ? "RESUME" : "COVER");
                    outputText.set(outputItem.output);
                }
            }

        });

        unsubscribeSettings = settingsStore.subscribe((value) => {
            settings = value;
        });

        unsubscribeUser = userStore.subscribe((value) => {
            user = value;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
        if(unsubscribeSettings) {
            unsubscribeSettings();
        }
        if(unsubscribeUser) {
            unsubscribeUser();
        }
    });

    async function loadJobOutputs(job) {
        loadingOutputPages.set(true);
        const response = await getFetch("/api/getJobOutputs", { job });
        loadingOutputPages.set(false);
        if(response.success) {
            jobsStore.update(oldJobs => {
                if(oldJobs[response.job]) {
                    oldJobs[response.job].outputs = [];
                    for(let i = 0; i < response.outputs.length; i++) {

                        let outputItem = {
                            id: response.outputs[i].id,
                            model: response.outputs[i].model,
                            tone: response.outputs[i].tone,
                            mode: response.outputs[i].mode,
                            output: JSON.parse(response.outputs[i].output)
                        }
                        oldJobs[response.job].outputs.push(outputItem)
                    }
                    oldJobs[response.job].outputs.sort((a, b) => a.id - b.id);
                    outputsLoaded[response.job] = true;
                }
                return oldJobs;
            })
        }
    }

    function updateActiveJob(job) {
        activeJob.set(job);
        if(jobs && jobs[job]) {
            title = jobs[job].title;
        }
        if(!jobs[job].outputs) {
            loadJobOutputs(job);
        } else if (outputsLoaded[job]) {
            if(jobs[job].outputs.length === 0) {
                activePage.set(0);
                outputText.set(null);
                outputMode.set("");
            } else {
                setActiveOutputPage(job, jobs[job].outputs.length);
            }
            outputsViewed[job] = true;
        }
    }

    function setActiveOutputPage(job, page) {

        if(!jobs || !jobs[job] || !jobs[job].outputs) return;
        if(jobs[job].outputs.length === 0) return;

        if(page > jobs[job].outputs.length) return;
        activePage.set(page);

        let outputItem = jobs[job].outputs[page - 1];
        outputMode.set(outputItem.mode === mode.RESUME ? "RESUME" : "COVER");
        outputText.set(outputItem.output);

    }

    function handlePageClick(page) {
        if($loading) return;
        stopStreaming.set(true);
        setActiveOutputPage($activeJob, page);
        stopStreaming.set(false);
    }

    function saveTitle() {
        jobsStore.update(oldJobs => {
            if(oldJobs === null) return null;
            let jobData = oldJobs[$activeJob];
            if(jobData) {
                jobData.title = title;
                saveJobTitle(jobData.id, title);
            }

            return oldJobs;
        })
    }

    async function deleteJob() {
        if($loadingDelete) return;
        let job = get(activeJob);
        if(!job) return;
        let jobAmount = Object.keys(jobs).length;
        if(jobAmount <= 1) return;

        if(!window.confirm("Are you sure you want to delete this job?")) return;
        
        loadingDelete.set(true);
        const response = await postFetch("/api/deleteJob", {job});
        loadingDelete.set(false);
        if(response.success) {
            
            let index = 0;
            let ids = Object.keys(jobs);
            for(let i = 0; i < ids.length; i++) {
                if(ids[i] === job) {
                    index = i;
                    break;
                }
            }
            
            let newActive;
            if(index < ids.length - 1) {
                newActive = ids[index + 1];
            } else {
                newActive = ids[index - 1];
            }

            jobsStore.update((oldJobs) => {
                if(oldJobs === null) return null;
                let oj = JSON.parse(JSON.stringify(oldJobs));
                delete oj[job];
                return oj;
            });
            activeJob.set(newActive);
            localStorage.setItem('activetab', newActive);

        } else {
            console.error(response.message);
        }

    }

    async function generate() {

        if (!jobs || !jobs[$activeJob]) return;
        if ($loading) return;

        stopStreaming.set(true);

        loading.set(true);
        activePage.set(0);
        outputError.set(false);
        try {
            const response = await postFetch("/api/generate", { job: $activeJob });
            stopStreaming.set(false);
            if (response.success) {

                outputError.set(false);

                let jobOutput;
                jobOutput = JSON.parse(response.jobOutput.output);
                outputText.set(response.jobOutput.mode === mode.RESUME ? "RESUME": "COVER");
                outputText.set(jobOutput);

                jobsStore.update((oldJobs) => {

                    let jobId = response.jobOutput.job;
                    if(!oldJobs[jobId].outputs) {
                        oldJobs[jobId].outputs = [];
                    }
                    oldJobs[jobId].outputs.push({
                        id: response.jobOutput.id,
                        output: jobOutput,
                        tone: response.jobOutput.tone,
                        model: response.jobOutput.model,
                        mode: response.jobOutput.mode
                    });

                    activePage.set(oldJobs[jobId].outputs.length);
                    return oldJobs;

                });

                userStore.update((oldUser) => {
                    oldUser.remainingGenerations = oldUser.remainingGenerations - 1;
                    return oldUser;
                });

                return;
            } else {
                console.error("Generation failed:", response.message);
                outputText.set({message: "Generation failed: " + response.message});
                outputError.set(true);
                outputMode.set("");
            }
        } catch (error) {
            console.error("Error during generation:", error);
            outputText.set({message: "An error occurred. Please try again."});
            outputError.set(true);
            outputMode.set("");
        } finally {
            loading.set(false);
            stopStreaming.set(false);
        }

    }

    let disableGenerateButton = false;
    let renderOutputPages = false;
    let generateLabel = "resume";
    let pageAmount = 0;
    let activeOutput = null;
    $: {

        disableGenerateButton = !jobs || 
                           !jobs[$activeJob] || 
                           !user || 
                           !jobs[$activeJob].personalInfo || 
                           !jobs[$activeJob].jobInfo || 
                           jobs[$activeJob].requiredSections.length === 0 || 
                           !user.verified || 
                           user.remainingGenerations <= 0;

        if(settings) {
            generateLabel = settings.mode === mode.COVER ? "cover letter" : "resume"; 
        }
        
        if (jobs && jobs[$activeJob] && jobs[$activeJob].outputs) {
            if (outputsLoaded[$activeJob] && jobs[$activeJob].outputs.length > 0) {
                renderOutputPages = true;
                pageAmount = jobs[$activeJob].outputs.length;
                if(!outputsViewed[$activeJob]) {
                    setActiveOutputPage($activeJob, jobs[$activeJob].outputs.length);
                    outputsViewed[$activeJob] = true;
                }
            } else {
                outputText.set(null);
                outputMode.set("");
                renderOutputPages = false;
                pageAmount = 0;
            }

            if($activePage) {
                activeOutput = jobs[$activeJob].outputs[$activePage - 1];
            } else {
                activeOutput = null;
            }

        }
        if (activeJob !== previousActiveJob) {
            previousActiveJob = $activeJob;
        }

    }

</script>

<svelte:head>
    <title>buckshot</title> 
</svelte:head>

<Navbar/>

{#if user}
    <div class="container">
        
        <Tabs 
            active={$activeJob}
            updateActive={(job) => updateActiveJob(job)}/>

        <div class="input-container">

            <input type="text" bind:value={title} maxLength={100} class="job-name-field" on:blur={saveTitle} placeholder="Job Title...">
            <div class="spacer"></div>

            {#if Object.keys(jobs).length > 1 && jobs[$activeJob]}
            <div class="delete-space" title="Delete Workspace">
                <div
                    on:click={deleteJob}
                    on:keydown={deleteJob}
                    role="button"
                    tabindex="0" 
                    class="delete-icon">
                    {#if $loadingDelete}
                    <LoadingIcon />
                    {:else}
                    <Trash/>
                    {/if}
                </div>
            </div>
            {/if}

            <UserInput 
                activeJob={$activeJob}/>
            <div class="spacer"></div>

            <SectionInput 
                activeJob={$activeJob}/>

            <div class="generate-section">
                <div class="generate-label">
                    Generate {generateLabel}
                </div>
                <Button 
                    onClick={() => generate()}
                    buttonText="Generate"
                    disabled={disableGenerateButton || $loading}
                    loading={$loading}></Button>
                <div class="generate-remaining">
                    <strong>{user.remainingGenerations}</strong> remaining
                </div>
            </div>
            <div class="spacer"></div>

            {#if renderOutputPages && !$loadingOutputPages}
            <OutputPages
                activePage={$activePage}
                pageAmt={pageAmount}
                onPageSelect={(page) => handlePageClick(page)} />
            <div class="spacer"></div>
            {/if}

            {#if $loadingOutputPages}
            <div class="loading-outputs">
                <LoadingIcon/> <div class="message">Loading</div> <LoadingIcon />
            </div>
            {/if}

            {#if !$loadingOutputPages}
                {#if !$loading}
                <OutputInfo 
                    activePage={$activePage}
                    activeOutput={activeOutput}
                    activeJob={$activeJob}/>
                {/if}
            <Output
                loading={$loading}
                output={$outputText} 
                activeJob={$activeJob}
                outputMode={$outputMode}
                error={$outputError}
                activePage={$activePage}
                stopStreaming={$stopStreaming}/>
            {/if}

            <div class="input-container-footer"></div>
        </div>

        <Settings/>

    </div>
{:else}
    <p class="redirecting">Redirecting...</p>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .input-container {
        
        flex:1;
        min-width:35rem;
        position: relative;
        
        input.job-name-field {
            padding:1rem 0;
            font-size:1.4rem;
            border:none;
            width:calc(100% - 5rem);
            border-bottom:1px solid $primary-color;
            font-family: 'Questrial',sans-serif;
            color:$primary-color;
        
            &:focus {
                outline:none;
            }
        }
        
        .loading-outputs {
            @include flex-center-row;
            margin-bottom:10px;
        }

        .delete-space {
            position:absolute;
            top:0;right:0;
            padding:0.4rem 0.5rem 0.2rem 0.5rem;
            border-radius:0.5rem;
            font-size:1.3rem;
            transition:all .2s ease-in-out;
            cursor:pointer;
            transform:translate(0,30%);
            .delete-icon {
                transform:translate(0,2px);
            }
            &:hover {
                background:$primary-color;
                color:$secondary-color;
            }
        }

        .generate-section {
            display:flex;
            flex-direction: row;
            align-items:center;
            justify-content: center;
            gap:1rem;
            margin-top:-0.9rem;

            .generate-label {
                margin-top:0rem;
            }
        }
        
        .input-container-footer {
            height:3rem;
        }
    }

    p.redirecting {
        margin-top:10rem;
        font-size:1.5rem;
        text-align:center;
    }

</style>