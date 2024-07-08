<script>
    import Trash from '~icons/ph/trash';
    export let onDelete = () => {}
</script>
<div
    on:click={onDelete}
    on:keydown={(e) => {if(e.key=== "Enter") onDelete()}}
    role="button"
    tabindex="0"
    class="remove-item">
    <div class="remove-icon"><Trash/></div>
</div>

<style lang="scss">

    @import "../../../styles/mixins.scss";
    
    .remove-item {
        @include flex-center-col;
        transform:translateY(2px);
        .remove-icon {
            cursor:pointer;
            transition:color .1s ease-in;
            &:hover {
                color:#ff5151;
            }
        }
    }
</style>