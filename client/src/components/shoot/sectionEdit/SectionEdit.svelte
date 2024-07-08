<script>

    import Section from "../../Section.svelte";
    import LineEdit from "./LineEdit.svelte";
    import TextEdit from "./TextEdit.svelte";
    import ContactInfo from "./ContactInfo.svelte";
    import Education from "./Education.svelte";
    import List from "./List.svelte";
    import Projects from "./Projects.svelte";
    import Skills from "./Skills.svelte";
    import WorkHistory from "./WorkHistory.svelte";

    export let name = "";
    export let output = null;
    export let closeEdit = () => {}

    function getEditComponent(section) {

        switch(section) {
            case "name":
            case "greeting":
                return LineEdit;
            case "summary":
            case "objective":
            case "body":
            case "signature":
                return TextEdit;
            case "contact info":
                return ContactInfo;
            case "education":
                return Education;
            case "work history":
                return WorkHistory;
            case "skills":
                return Skills;
            case "projects":
                return Projects;
            case "volunteering":
            case "certifications":
            case "awards":
            case "academic achievements":
            case "references":
            case "hobbies":
            case "websites":
            case "other stuff":
                return List;
        }
    }

    $: component = getEditComponent(name);

</script>

{#if name && output}
<div class="section-edit-outer">
    <div class="section-edit-inner">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:click={closeEdit} 
            class="section-edit-background">
        </div>
        <div class="section-edit-container">
            <Section fill>
                <h2>edit {name}</h2>

                {#if component}
                    <svelte:component this={component} 
                        name={name} 
                        output={output}
                        onSave={null}
                        onClose={closeEdit} />
                {/if}

            </Section>
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    @import "../../../styles/mixins.scss";

    .section-edit-outer {
        @include center-fixed;
        height:100dvh;width:100dvw;
        z-index:1000;
        .section-edit-inner {
            height:100dvh;width:100dvw;
            position:relative;
            .section-edit-background {
                height:100dvh;width:100dvw;
                background:#ffffffcc;
                z-index:1001;
                animation:modal-appear .1s cubic-bezier(0.445, 0.05, 0.55, 0.95) 1;
            }
            .section-edit-container {
                z-index:1002;
                position:absolute;
                top:50%;left:50%;
                width:50dvw;
                transform:translate(-50%, -50%);
                animation:modal-fade-in .2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
                padding:1rem;

                h2 {
                    font-size:1.4rem;
                    text-align:center;
                }
            }
        }
    }

</style>