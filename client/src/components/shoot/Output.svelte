<script>
    import SvelteMarkdown from 'svelte-markdown';
    import { writable } from "svelte/store";

    export let loading = false;
    export let error = false;
    export let output = "";
    export let stopStreaming = false;
    export let activeJob = "";

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
            (value) => value + output.substring(index, index + 3),
        );
        index += 3;
        setTimeout(() => streamTextR(index), 1);
    }

    $: if (output !== "") {
        streamText();
    }

</script>

{#if output && !error && activeJob}
<div class="output-options">
    <div class="output-model">
        GPT-4O
    </div>
    <div class="output-tone">
        CURT
    </div>
    <div class="output-download">
        <a href={"/api/downloadOutput/" + activeJob}>DOWNLOAD</a>
    </div>
</div>
{/if}

<Section>
    {#if loading}
        <div class="loading-output">
            <Loading />
            Generating
            <Loading />
        </div>
    {:else}
        <pre class="output-inner">
            {#if error}
                {$outputStream}
            {:else}
            <SvelteMarkdown source={$outputStream} renderers={{link: LinkComponent}} />
            {/if}
        </pre>
    {/if}
</Section>

<style lang="scss">
    @import "../../styles/mixins.scss";

    .loading-output {
        @include flex-center-row;
        margin: 1rem 0;
    }

    .output-inner {
        padding: 0 1rem;
        width: calc(#{$input-section-width} - 3rem);
        white-space: pre-line;
        word-wrap: break-word;
        font-family: "PT Mono", monospace;
    }
</style>
