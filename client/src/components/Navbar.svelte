<script>
    
    import { get } from 'svelte/store';
    import { userStore } from '../stores/stores.js';
    import { onDestroy, onMount } from 'svelte';

    let user = null;
    let unsubscribe = null;

    onMount(() => {
        unsubscribe = userStore.subscribe(value => {
            user = value;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

</script>

<div class="banner">
  <a href="/">
    <h1>buckshot</h1>
  </a>
  <div class="links-outer">
    {#if user}
        <a href="/">home</a>
        <a href="/shoot">shoot</a>
        <a href="/connect">connect</a>
        <a href="/premium">
          {#if !user.premium}
          <span class="notif"></span>
          {/if}
          pricing
        </a>
        <a href="/account">account</a>
        <a href="/logout">logout</a>
    {:else}
        <a href="/premium"><span class="notif"></span>pricing</a>
        <a href="/login">login</a>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../styles/variables.scss";

  .banner {
    margin: 0;
    padding: 0 17rem;
    background: $primary-color;
    background: $background;
    color: $secondary-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    position:relative;
    z-index:1000;

    h1 {
      display: inline-block;
      margin: 0;
      color: $secondary-color;
    }

    .links-outer {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
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
    }
  }
</style>
