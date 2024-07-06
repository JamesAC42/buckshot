<script>
    export let fill = false;
</script>

<div class={"section-outer " + (fill ? "fill" : "")}>
    <div class="section-background"></div>
    <div class="section-inner">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "../styles/variables.scss";
</style>