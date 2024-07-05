<script>
    import SvelteMarkdown from 'svelte-markdown';
    import { writable } from "svelte/store";

    export let loading = false;
    export let error = false;
    export let output = "";
    export let stopStreaming = false;

    let fadeIn = false;

    import Section from "../Section.svelte";
    import Loading from "~icons/svg-spinners/pulse-2";
    import LinkComponent from './LinkComponent.svelte';

    let outputStream = writable("");

    function streamText() {
        stopStreaming = false;
        outputStream.update((value) => "");
        streamTextR(0);
    }

    function streamTextR(index) {
        if (stopStreaming) return;
        if (index > output.length) return;
        outputStream.update(
            (value) => value + output.substring(index, index + 15),
        );
        index += 15;
        setTimeout(() => streamTextR(index), 1);
    }

    $: if (output !== "") {
        fadeIn = true;
        setTimeout(() => {
            fadeIn = false;
        }, 300);
    }

</script>

<Section>
    {#if loading}
        <div class="loading-output">
            <Loading />
            Generating
            <Loading />
        </div>
    {:else}
        {#if output !== ""}
        <pre class="output-inner" class:fade-in={fadeIn}>
            {#if error}
                {output}
            {:else}
            <SvelteMarkdown source={output} renderers={{link: LinkComponent}} />
            {/if}
        </pre>
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
        margin: 1rem 0;
    }

    .no-output {
        text-align:center;
    }

    .output-inner {
        padding: 0 1rem;
        margin-bottom:0;
        width: calc(#{$input-section-width} - 3rem);
        white-space: pre-line;
        word-wrap: break-word;
        font-family: "PT Mono", monospace;
        
        &.fade-in {
            @include appear-text;
        }
    }
</style>
