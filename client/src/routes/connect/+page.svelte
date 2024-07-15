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

    let activeSection = writable(2);
    function setActiveSection(section) {
        activeSection.set(section);
    }

</script>

<Navbar/>

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

</style>