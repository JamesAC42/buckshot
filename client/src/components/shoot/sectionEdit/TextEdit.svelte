<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";

    export let name = "";
    export let output = null;

    export let onSave = (content) => {}
    export let onClose = () => {}

    export let error;
    export let loading = false;

    let textItem = writable("");

    function handleOnSave() {

        let text = $textItem.trim();
        if(text.length === 0) {
            error.set("Enter some text.");
            return;
        }
        if(text.length > 5000) {
            error.set("Text too long");
            return;
        }

        onSave(text);

    }

    $: {
        if(output[name]) {
            if(name === "body") {
                textItem.set(output[name].join("\n\n"));
            } else if(name === "signature") {
                textItem.set(output[name].signoff + "\n" + output[name].name);
            } else {
                textItem.set(output[name]);
            }
        }
    }

</script>

<div class="text-edit-outer">

    <div class="text-edit-inner">
        <textarea bind:value={$textItem} maxLength={5000} placeholder="Enter text..."/>
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

    .text-edit-outer {
        @include section-edit-inner;

        .text-edit-inner {
            position:relative;
            height:100%; 
            @include flex-center-row;
            @include appear-text;

            textarea {
                width:92%;
                padding:1rem;
                font-size:0.9rem;
                font-family: "PT Mono", monospace;
                height:20rem;
                line-height:1.1rem;
                resize:none;
                border-radius:0.2rem;
                outline:none;
                border:1px solid $primary-color;
                scrollbar-width:thin;
            }
        }
    }

    .error {
        @include section-edit-error;   
    }

</style>