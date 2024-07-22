<script>
    import { writable } from "svelte/store";

    import Actions from "./Actions.svelte";

    export let name = "";
    export let output = null;

    export let onSave = (newContent) => {}
    export let onClose = () => {}

    export let error;
    export let loading = false;

    function handleOnSave() {
        if($lineItem.trim().length === 0) {
            error.set("Enter a name");
            return;
        }
        if($lineItem.length > 100) {
            error.set("Name too long");
            return;
        }
        onSave($lineItem.trim());
    }

    let lineItem = writable("");

    $: {
        if(output[name]) {
            lineItem.set(output[name]);
        }
    }

</script>

<div class="line-edit-outer">
    <div class="line-edit-inner">
        <input bind:value={$lineItem} maxLength={100} placeholder="Enter text..."/>
    </div>
    {#if $error}
    <div class="error">{$error}</div>
    {/if}
</div>
<Actions 
    loading={loading}
    disabled={loading}
    onClose={onClose} 
    onSave={handleOnSave}/>

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
    .error {
        @include section-edit-error;   
    }
    @media screen and (max-width: 900px) {
        .line-edit-outer {
            .line-edit-inner {
                input {
                    width:80%;
                }
            }
        }
    }

</style>