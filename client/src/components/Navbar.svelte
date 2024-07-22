<script>
    
    import { get, writable } from 'svelte/store';
    import { userStore } from '../stores/stores.js';
    import { onDestroy, onMount } from 'svelte';

    import Menu from "~icons/ic/baseline-menu";
    import Close from "~icons/ic/baseline-close";
    import NavLinks from './NavLinks.svelte';

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

    let showMenu = writable(false);
    let leaving = writable(false);
    function toggleMenu() {
      if($showMenu) {
        leaving.set(true);
        setTimeout(() => {
          leaving.set(false);
          showMenu.set(!$showMenu);
        },90);
      } else {
        showMenu.set(!$showMenu);
      }
    }

</script>

<div class="banner">
  <a href="/">
    <h1>buckshot</h1>
  </a>
  <div class="links-outer">
    <div class="links-horizontal">
      <NavLinks user={user}/>
    </div>
    <div class="links-menu-open">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        on:click={toggleMenu} 
        class="menu-button">
        <Menu />
      </div>
    </div>
  </div>
</div>

{#if $showMenu}
<div class="menu-outer" class:leaving={$leaving}>
  <div class="menu-inner">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={toggleMenu} 
      class="close-menu">
      <Close/>
    </div>
    <div class="links-vertical">
      <NavLinks user={user}/>
    </div>
  </div>
</div>
{/if}

<style lang="scss">
  @import "../styles/mixins.scss";

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
      margin-left:auto;
      .links-horizontal {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
      }
    }

    .links-menu-open {
      display:none;
    }

  }

  .links-horizontal, .links-vertical {
    display:flex;
  }

  .links-horizontal {
    flex-direction:row;
  }
  .links-vertical {
    flex-direction:column;
    gap:2rem;
    font-size:1.4rem;
    width:fit-content;
  }


  @keyframes slide-menu-enter {
    0% {
      transform:translate(100%,0);
    }
    100% {
      transform:translate(0,0);
    }
  }
  
  @keyframes slide-menu-leaving {
    0% {
      transform:translate(0,0);
    }
    100% {
      transform:translate(100%,0);
    }
  }

  .menu-outer {
    position:fixed;
    z-index:1200;
    top:0;right:0;
    height:100dvh;width:100dvw;
    transform:translate(0,0);
    background:$background;
    
    animation:slide-menu-enter 0.1s cubic-bezier(0.215, 0.610, 0.355, 1) 1;

    &.leaving {
      animation:slide-menu-leaving 0.1s cubic-bezier(0.215, 0.610, 0.355, 1) 1;
    }

    .menu-inner {
      position:relative;
      height:100dvh;width:100dvw;
      @include flex-center-col;
      align-items:center;
      .close-menu {
        position:absolute;
        top:0;right:0;
        margin:2rem;
        font-size:1.2rem;
        color:$secondary-color;
        cursor:pointer;
      }
    }
  
  }

  

  @media screen and (max-width: 1200px) {

    .banner {
      padding:0 2rem;
  
      .links-outer {
        .links-horizontal {
          display:none;
        }
  
        .links-menu-open {
          display:block;
  
          .menu-button {
            cursor:pointer;
          }
        }
      }
    }

  }

  

  @media screen and (max-width: 400px) { 
    h1 {
      font-size:1.5rem;
    }
  }

</style>
