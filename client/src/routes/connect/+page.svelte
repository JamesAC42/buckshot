<svelte:head>
    <title>buckshot</title>
</svelte:head>

<script>
    
    import { writable } from "svelte/store";
    import ConnectSection from "../../components/connect/ConnectSection.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import Testimonials from "../../components/connect/Testimonials.svelte";
    import Forum from "../../components/connect/Forum.svelte";
    import Chat from "../../components/connect/Chat.svelte";

    import Person from "~icons/material-symbols/person-pin-rounded";
    import Write from "~icons/material-symbols/edit-document-rounded";
  	import ChatIcon from "~icons/material-symbols/mark-chat-unread-rounded";
    import { onDestroy, onMount } from 'svelte';
    import { userStore } from '../../stores/stores';
    import { authGuard } from '$lib/authGuard';

    let activeSection = writable(2);
    function setActiveSection(section) {
        activeSection.set(section);
    }

    let user = null;
    let unsubscribe = null;
    onMount(async () => {
        user = await authGuard();
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

<Navbar/>

{#if user}
<div class="connect-outer">

    <div class="connect-inner">

        <ConnectSection 
            id={1} 
            active={$activeSection}
            onExpand={(section) => setActiveSection(section)}>
            <Testimonials 
                active={$activeSection === 1} />
        </ConnectSection>
        <ConnectSection 
            id={2} 
            active={$activeSection}
            onExpand={(section) => setActiveSection(section)}>
            <Forum 
                active={$activeSection === 2} />
        </ConnectSection>
        <ConnectSection 
            id={3} 
            active={$activeSection}
            onExpand={(section) => setActiveSection(section)}>
            <Chat 
                active={$activeSection === 3}  />
        </ConnectSection>

    </div>

</div>

<div class="connect-nav">
    <div class="connect-nav-inner">
        <div
            on:click={() => setActiveSection(1)} 
            class="connect-nav-item"
            role="button"
            tabindex="0"
            on:keydown={() => {}}>
            <Person />
        </div>
        <div 
            on:click={() => setActiveSection(2)} 
            class="connect-nav-item"
            role="button"
            tabindex="0"
            on:keydown={() => {}}>
            <Write />
        </div>
        <div
            on:click={() => setActiveSection(3)}  
            class="connect-nav-item"
            role="button"
            tabindex="0"
            on:keydown={() => {}}>
            <ChatIcon />
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .connect-outer {

        .connect-inner {
            @include center-fixed;
            width:85dvw;
            height:80dvh;
            margin-top:2rem;
            display:flex;
            flex-direction: row;
            gap:1rem;
        }
    }

    .connect-nav {
        display:none;
    }

    @media screen and (max-width: 1100px) {
    
        .connect-outer {
            .connect-inner {
                width:100dvw;
                height:calc(100dvh - 8rem);
                margin-top:1rem;
            }
        }

        .connect-nav {
            position:fixed;
            bottom:0;left:0;
            height:3rem;width:100dvw;
            background:$background;
            @include flex-center-row;
            align-items: center;
            .connect-nav-inner {
                @include flex-center-row;
                justify-content: space-between;
                gap:5rem;
                align-items: center;
                .connect-nav-item {
                    transform:translate(0,3px);
                    color:$secondary-color;
                    font-size:1.2rem;
                    cursor:pointer;
                }
            }
        }
    
    }

</style>