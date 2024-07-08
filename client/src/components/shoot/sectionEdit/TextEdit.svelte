<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let textItem = writable("");

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
        <textarea bind:value={$textItem} placeholder="Enter text..."/>
    </div>

</div>
<Actions onClose={onClose} onSave={onSave}/>


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

</style>