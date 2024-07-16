<script>
    export let fill = false;
    export let fillWidth = false;
    export let background = true;
</script>

<div class="section-outer" class:fill={fill} class:fill-width={fillWidth}>
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