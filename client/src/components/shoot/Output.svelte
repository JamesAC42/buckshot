<script>
    import { writable } from "svelte/store";

    export let loading = false;
    export let output = "";
    export let stopStreaming = false;

    import Section from "../Section.svelte";
    import Loading from "~icons/svg-spinners/pulse-2";

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

<Section>
    {#if loading}
        <div class="loading-output">
            <Loading />
            Generating
            <Loading />
        </div>
    {:else}
        <pre class="output-inner">
            {output}
        </pre>
    {/if}
</Section>

<style lang="scss">
    @import "../../styles/mixins.scss";

    .loading-output {
        @include flex-center-row;
        margin: 1rem 0;
    }

    pre {
        padding: 0 1rem;
        width: calc(#{$input-section-width} - 3rem);
        white-space: pre-line;
        word-wrap: break-word;
        font-family: "PT Mono", monospace;
    }
</style>
