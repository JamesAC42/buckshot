<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";

    export let name = "";
    export let output = null;

    export let onSave = () => {}
    export let onClose = () => {}

    let lineItem = writable("");

    $: {
        if(output[name]) {
            lineItem.set(output[name]);
        }
    }

</script>

<div class="line-edit-outer">
    <div class="line-edit-inner">
        <input bind:value={$lineItem} placeholder="Enter text..."/>
    </div>
</div>
<Actions onClose={onClose} onSave={onSave}/>

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .line-edit-outer {
        @include section-edit-inner;

        .line-edit-inner {
            position:relative;
            height:100%; 
            @include flex-center-row;
            @include appear-text;

            input {
                @include section-edit-input;
                width:70%;
            }
        }
    }

</style>