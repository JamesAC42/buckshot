<script>

    export let user;

</script>
{#if user}
    <a href="/">home</a>
    <a href="/shoot">shoot</a>
    <a href="/connect">connect</a>
    <a href="/pricing">
    {#if !user.premium}
    <span class="notif"></span>
    {/if}
    pricing
    </a>
    <a href="/account">account</a>
    <a href="/logout">logout</a>
    {:else}
    <a href="/pricing"><span class="notif"></span>pricing</a>
    <a href="/login">login</a>
{/if}

<style lang="scss">

    @import "../styles/mixins.scss";

    a {
        color: $secondary-color;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        &:hover {
            text-decoration: underline;
        }

        .notif {
            position: absolute;
            height: 6px;
            width: 6px;
            border-radius: 50%;
            background: $secondary-color;
            top: 0;
            right: 0;
            z-index: 1000;
            transform: translate(5px, 0);
        }
    }
</style>