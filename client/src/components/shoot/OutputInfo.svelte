<script>
    
    import { writable } from "svelte/store";
    import DownloadOptions from "./DownloadOptions.svelte";
    import Section from "../Section.svelte";

    import Download from "~icons/material-symbols/sim-card-download-rounded";

    export let activePage = 0;
    export let activeOutput = null;
    export let activeJob = "";
    let previousPage = activePage;
    let previousJob = activeJob;

    let showDownload = writable(false);
    let fadeIn = false;

    const models = {
        1: "GPT 4O",
        2: "GPT 4TURBO",
        3: "CLAUDE 3.5 SONNET"
    };

    const tone = {
        1: "STANDARD",
        2: "CURT",
        3: "HAMMY"
    };

    $: {
        if(previousPage !== activePage || previousJob !== activeJob) {
            previousPage = activePage;
            previousJob = activeJob;
            fadeIn = true;
            setTimeout(() => {
                fadeIn = false;
            }, 300);
        }
    }

</script>

{#if $showDownload}
    <DownloadOptions 
        activeOutput={activeOutput}
        activeJob={activeJob}/>
{/if}

{#if activeOutput && activeJob}
<Section>
    <div class="output-options" class:fade-in={fadeIn}>
        <div class="output-model">
            {models[activeOutput.model]}
        </div>
        <div class="separator"></div>
        <div class="output-tone">
            {tone[activeOutput.tone]}
        </div>
        <div class="output-download">
            <div class="download-icon">
                <Download />
            </div>
            <div class="download-label">
                DOWNLOAD
            </div>
        </div>
    </div>
</Section>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .output-options {
        padding:1rem;
        display:flex;
        flex-direction:row;
        align-items:center;
        position:relative;
        &.fade-in {
            @include appear-text;
        }

        .separator {
            width: 1px;
            margin: 0 1rem;
            background-color: $primary-color;
            align-self: stretch;
        }

        .output-download {
            margin-left:auto;
            @include flex-center-row;
            gap:0.5rem;
            border-radius:0.3rem;
            padding:0.1rem 0.5rem;
            $download-color: #605dff;
            color:$download-color;
            cursor:pointer;
            transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
            * {
                transform:translateY(2px);
            }
            &:hover {
                background:$download-color;
                color:#fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.489);
            }
        }
    }

</style>