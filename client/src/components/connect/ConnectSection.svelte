<script>

  import Person from "~icons/material-symbols/person-pin-rounded";
  import Chat from "~icons/material-symbols/mark-chat-unread-rounded";
  import Write from "~icons/material-symbols/edit-document-rounded";

  export let active = 0;
  export let id = 0;

  export let onExpand = (section) => {}

  let Icon = null;
  $: {
    switch(id) {
        case 1:
            Icon = Person;
            break;
        case 2:
            Icon = Write;
            break;
        case 3:
            Icon = Chat;
            break;
    }
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click={() => onExpand(id)}
    class="connect-section" 
    class:collapsed={active !== id}>
    <div class="section-outer fill">
        <div class="section-background"></div>
        <div class="section-inner">
            {#if active == id}
            <slot />
            {:else}
            <div class="expand-outer">
                <Icon />
            </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .connect-section {
        height:100%;
        flex:1;

        width:fit-content;
        max-width:100%;
        position:relative;

        transition:max-width 0.1s cubic-bezier(0.19, 1, 0.22, 1);

        @include pop-in-transition;

        .section-outer {
            @include section-outer;
            .section-background {
                @include drop-shadow;
            }
            .section-inner {
                @include section-inner;
            }
        }

        &.collapsed {
            max-width:5rem;
            cursor:pointer;

            .section-outer {
                .section-inner {
                    @include flex-center-col;
                    align-items:center;
                    &:hover {
                        transition:all .1s cubic-bezier(0.165, 0.84, 0.44, 1);
                        background:#eeeeee;
                    }
                    .expand-outer {
                        @include flex-center-col;
                        gap:1rem;
                        transform:translateX(-2px);
                        font-size:1.5rem;
                    }
                }
            }

        }

    }

    @media screen and (max-width: 1100px) {
        .connect-section {
            .section-outer {
                .section-background {
                    display:none;
                }
                .section-inner {
                    border:none;
                }
            }
            &.collapsed {
                display:none;
            }
        }
    }

</style>