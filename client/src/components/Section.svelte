<script>
    export let fill = false;
    export let background = true;
</script>

<div class={"section-outer " + (fill ? "fill" : "")}>
    {#if background}
    <div class="section-background"></div>
    {/if}
    <div class="section-inner">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "../styles/variables.scss";
</style>