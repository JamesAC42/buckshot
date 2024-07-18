<script>
    import SvelteMarkdown from 'svelte-markdown';
    import { writable } from "svelte/store";

    export let loading = false;
    export let error = false;
    export let output = null;
    export let outputMode = "";
    export let activePage = 0;
    export let activeJob = "";
    // export let stopStreaming = false;

    let previousOutput;

    let fadeIn = false;

    import Section from "../Section.svelte";
    import Loading from "~icons/svg-spinners/pulse-2";
    import LinkComponent from './LinkComponent.svelte';

    import Pencil from "~icons/material-symbols/edit-outline";

    import formatLetterAsMarkdown from "$lib/formatLetterAsMarkdown";
    import formatOutputAsMarkdown from "$lib/formatOutputAsMarkdown";
    import SectionEdit from './sectionEdit/SectionEdit.svelte';

    let activeEdit = writable("");

    // let outputStream = writable("");

    // function streamText() {
    //     stopStreaming = false;
    //     outputStream.update((value) => "");
    //     streamTextR(0);
    // }

    // function streamTextR(index) {
    //     if (stopStreaming) return;
    //     if (index > output.length) return;
    //     outputStream.update(
    //         (value) => value + output.substring(index, index + 15),
    //     );
    //     index += 15;
    //     setTimeout(() => streamTextR(index), 1);
    // }

    function showEditWindow(section) {
        activeEdit.set(section);
    }

    function renderName(section) {
        if(section.name === "name") {
            return section.text;
        } else {
            return "### " + section.name;
        }
    }

    let sections = [];

    $: if (output !== null && previousOutput !== output) {

        fadeIn = true;
        setTimeout(() => {
            fadeIn = false;
        }, 300);

        if(outputMode === "RESUME") {
            sections = formatOutputAsMarkdown(output);
        } else if(outputMode === "COVER") {
            sections = formatLetterAsMarkdown(output);
        }

        previousOutput = output;
    }

</script>

{#if $activeEdit && output}
<SectionEdit
    name={$activeEdit}
    output={output}
    activePage={activePage}
    activeJob={activeJob}
    closeEdit={() => activeEdit.set("")}/>
{/if}

<Section fillWidth>
    {#if loading}
        <div class="loading-output">
            <Loading />
            Generating
            <Loading />
        </div>
    {:else}
        {#if output !== null}
            <div class="output-inner" class:fade-in={fadeIn}>
            {#if error}
                <div class="output-error">
                    {output.message}
                </div>
            {:else}
                {#each sections as section}
                    <div class="output-section">
                        <div class="section-name">
                            <div 
                            on:click={() => showEditWindow(section.name)}
                            on:keydown={(e) => { if(e.key === "Enter") showEditWindow(section.name)}}
                            tabindex="0"
                            role="button"
                            class="output-edit-button"><Pencil/></div>
                            <SvelteMarkdown source={renderName(section)} renderers={{link: LinkComponent}} />
                        </div>
                        {#if section.name !== "name"}
                        <SvelteMarkdown source={section.text} renderers={{link: LinkComponent}} />
                        {/if}
                    </div>
                {/each}
            {/if}
                </div>
        {:else}
            <div class="spacer"></div>
            <div class="no-output">Nothing to show here yet.</div>
            <div class="spacer"></div>
        {/if}
    {/if}
</Section>

<style lang="scss">
    @import "../../styles/mixins.scss";

    .loading-output {
        @include flex-center-row;
        gap:0.5rem;
        margin: 1rem 0;
    }

    .no-output {
        text-align:center;
    }

    .output-error {
        margin:1rem 0;
    }

    .output-inner {
        padding: 0 1rem;
        margin-bottom:0;
        white-space: pre-line;
        word-wrap: break-word;
        font-family: "PT Mono", monospace;
        
        &.fade-in {
            @include appear-text;
        }
        
        .output-section {

            .section-name {
                position:relative;
                width:fit-content;
                .output-edit-button {
                    position:absolute;
                    right:0;top:50%;
                    opacity:0;
                }
            }
            &:hover {
                @keyframes slide-in {
                    0% { transform: translate(0%, calc(-50% + 2px)); opacity:0; }
                    100% { transform: translate(150%, calc(-50% + 2px)); opacity:1;}
                }
                .output-edit-button {
                    animation:slide-in .1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
                    opacity:1;
                    transform:translate(150%, calc(-50% + 2px));
                    cursor:pointer;
                }
            }
        }
    
    }
</style>
