<script>

    import Save from "~icons/ion/md-save";
    import CloseIcon from '~icons/material-symbols/tab-close-outline';
    import LoadingIcon from '~icons/svg-spinners/pulse-2';

    export let onSave = () => {};
    export let onClose = () => {};

    export let disabled = false;
    export let loading = false;

</script>

<div class="action-outer">
    <div
        on:click={onSave}
        on:keydown={(e) => {if(e.key === "Enter") onSave()}}
        tabindex="0"
        role="button" 
        class={"save " + (disabled ? "disabled " : "")}>
        <div class="btn-label">Save</div>
        {#if !loading}
        <div class="btn-icon"><Save/></div>
        {:else}
        <div class="btn-icon"><LoadingIcon/></div>
        {/if}
    </div>
    <div 
        on:click={onClose}
        on:keydown={(e) => {if(e.key === "Enter") onClose()}}
        tabindex="0"
        role="button" 
        class="close">
        <div class="btn-label">Cancel</div>
        <div class="btn-icon"><CloseIcon/></div>
    </div>
</div>

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .action-outer {
        @include flex-center-row;
        gap:1rem;
        margin:0.8rem;

        .save {margin-left:auto;}

        .save, .close {
            @include simple-button;
        }

    }

</style>