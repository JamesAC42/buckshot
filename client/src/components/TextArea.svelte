<script>
    export let value = "";
    export let rows = 8;
    export let cols = 50;
    export let disabled = false;
    export let readonly = false;
    export let onBlur = () => {};
    export let maxLength = 10000;
    export let placeholder = "Input text...";
</script>

<div class="section-outer text-area-outer">
    <div class="section-background"></div>
    <textarea 
        class="info-input-inner" 
        bind:value={value} 
        on:blur={onBlur}
        rows={rows} 
        cols={cols} 
        {disabled} 
        {readonly} 
        maxLength={maxLength}
        placeholder={placeholder}/>
</div>

<style lang="scss">
    
    @import "../styles/variables.scss";
    @import "../styles/mixins.scss";

    .section-outer {
        width:auto;
    }

    .text-area-outer {
        @include pop-in-transition;
    }

    textarea.info-input-inner {
        height:28rem;
        width:calc(100% - 2rem);
        border:1px solid $primary-color;
        border-radius:4px;
        resize:none;
        font-family: 'Questrial',sans-serif;
        font-size:1.1rem;
        padding:1rem;
        color:$primary-color;
    }

    textarea.info-input-inner:focus {
        border:1px solid $secondary-color;
        outline:1px solid $primary-color;
        color:$secondary-color;
        background:$primary-color;
    }

</style>